/*
 * Author: Marco Pasqualini
 * File: source/callManager/callManager.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { Store } from 'redux';
import { StoreInterface } from '../store/types/storeInterface';
import { ActionInterface, OperationType, ElementType } from '../store/action/actionInterface';
import { Observer } from './storeObserver';
import { RestManager } from './restManager';
import storeRestMapper from './transformers/storeRestMapper';
import restStoreMapper from './transformers/restStoreMapper';
import { AxiosResponse } from 'axios';

const operationMapSwag: any = {
  [OperationType.INSERT]: 'post',
  [OperationType.EDIT]: 'put',
  [OperationType.VIEW]: 'delete',
};

const operationMapGraph: any = {
  [OperationType.INSERT]: 'post',
  [OperationType.EDIT]: 'patch',
  [OperationType.VIEW]: 'delete',
};

const elementMap: any = {
  [ElementType.ASSET]: 'asset',
  [ElementType.NODE]: 'node',
  [ElementType.EDGE]: 'edge',
  [ElementType.SCENARIO]: 'scenarios',
  [ElementType.CONTAINER]: 'container',
  [ElementType.ANALYSIS]: 'container',
};

/** Converts actions into API calls and viceversa  */
class CallManager implements Observer {
  /** UUID of the graph currently used  */
  private graphUuid: string;
  /** UUID of the customer currently used  */
  private customerUuid: string;
  /** referement to the redux store to dispatch inbound data  */
  private store: Store<StoreInterface>;
  /** RestManager towards the graph API  */
  private restGraph: RestManager;
  /** RestManager towards the scenario and analisys API  */
  private restSwag: RestManager;
  /** Indicates wathever the callManager is in initialitation status or not  */
  private initing: boolean;
  /** Maps internal uuids to the new API uuids  */
  private uuidStorage: any;

  public constructor(
    store: Store<StoreInterface>,
    graphUuid: string,
    customerUuid: string,
    dev: boolean) {
    this.store = store;
    this.graphUuid = graphUuid;
    this.customerUuid = customerUuid;
    this.restGraph = new RestManager('http://ayako.local/mitsuko/v01/');
    this.uuidStorage = {};
    if (!dev) {
      this.restSwag = new RestManager(
        'http://ayako.local/midori/v02/customers/' + this.customerUuid + '/',
        'http://ayako.local/midori/v02/get-token/',
        'admin',
        'admin');
    } else {
      this.restSwag = new RestManager('http://ayako.local/midori/v02/');
    }
    this.init(dev);
  }

  /** Handles inbound actions from the store  */
  public notify(action: ActionInterface<any>) {
    if (this.initing || action.type === ElementType.CONTAINER ||
      action.type === ElementType.ANALYSIS ||
      action.type === ElementType.REACTDATA) {
      return;
    }

    const payload: any = storeRestMapper(action);
    if ('customer' in payload) {
      payload.customer = this.customerUuid;
    }

    if ([
      ElementType.ASSET,
      ElementType.ANALYSIS,
      ElementType.CONTAINER,
      ElementType.SCENARIO,
    ].indexOf(action.type) !== -1) {
      this.sendSwag(action, payload);
    } else if ([ElementType.NODE, ElementType.EDGE].indexOf(
      action.type) !== -1) {
      this.sendGraph(action, payload);
    } else {
      console.error('unsupported action: ', action);
    }
  }

  /** Handles inbound actions from the store regarding graphs  */
  private sendGraph(action: ActionInterface<any>, payload: any) {
    payload.graphUuid = this.graphUuid;
    const operation: string = operationMapGraph[action.operation];
    let path: string = '';

    if (action.operation === OperationType.INSERT) {
      const parent: string = 'graph/' + this.graphUuid + '/';
      path = parent + elementMap[action.type] + '/new/';
    } else {
      path = elementMap[action.type] + '/' + payload.uuid + '/uuid/';
    }

    if (action.type === ElementType.NODE) {
      payload.nodeUuid = payload.uuid;
      delete payload.uuid;
    } else if (action.type === ElementType.EDGE) {
      payload.edgeUuid = payload.uuid;
      delete payload.uuid;
    }

    if (action.operation === OperationType.INSERT && action.type === ElementType.NODE) {
      const asset = payload.asset;
      const eav = payload.eav_values;
      payload.eav_values = [];
      payload.asset = null;

      this.restGraph.call(
        operation,
        path,
        (response: AxiosResponse) => {
          payload.asset = this.transformUuid(asset);
          payload.eav_values = eav;
          this.restGraph.call(
            'put',
            'node/' + payload.nodeUuid + '/uuid/',
            (response2: AxiosResponse) => {
              delete payload.asset;
              this.restGraph.call(
                'put',
                'node/' + payload.nodeUuid + '/uuid/',
                this.responseHandler,
                payload);
            },
            payload);
        },
        payload);
    } else {
      this.restGraph.call(operation, path, this.responseHandler, payload);
    }
  }

  /** Handles inbound actions from the store regarding scenarios  */
  private sendSwag(action: ActionInterface<any>, payload: any) {
    const operation: string = operationMapSwag[action.operation];
    let path: string = elementMap[action.type];
    if (path === 'asset') {
      path = path + 's';
    }
    path = path + '/';

    if (action.operation !== OperationType.INSERT) {
      path = path + this.transformUuid(payload.uuid) + '/';
    }

    this.restSwag.call(
      operation,
      path,
      (response: AxiosResponse) => {
        this.uuidStorage[payload.uuid] = JSON.parse(response.data).uuid;
      },
      payload);
  }

  private transformUuid(uuid: string) {
    if (uuid in this.uuidStorage) {
      return this.uuidStorage[uuid];
    } else {
      return uuid;
    }
  }

  /** Handles API calls responses  */
  // tslint:disable-next-line:no-empty
  private responseHandler(response: AxiosResponse) {}

  /** Initialise the store with data from the server  */
  private init(dev: boolean) {
    let assets: any = null;
    let nodes: any = null;
    let edges: any = null;
    let scenarios: any = null;

    this.initing = true;

    if (!dev) {
      this.restGraph.call(
        'GET',
        'graph/' + this.graphUuid + '/uuid/',
        (response: AxiosResponse) => {
          edges = response.data.edge_set;
          nodes = response.data.node_set;
          this.restGraph.call(
            'GET',
            'customer/' + this.customerUuid + '/uuid/',
            (response2: AxiosResponse) => {
              assets = response2.data.asset_set;

              this.restSwag.call(
                'GET',
                'scenarios/',
                (response3: AxiosResponse) => {
                  scenarios = JSON.parse(response3.data).results;
                  console.log('callManager init:', { assets, nodes, edges, scenarios });
                  for (const asset of assets) {
                    this.store.dispatch(restStoreMapper(asset, 'asset'));
                  }
                  for (const node of nodes) {
                    this.store.dispatch(restStoreMapper(node, 'node'));
                  }
                  for (const edge of edges) {
                    this.store.dispatch(restStoreMapper(edge, 'edge'));
                  }
                  for (const scenario of scenarios) {
                    this.store.dispatch(restStoreMapper(scenario, 'scenario'));
                  }

                  this.initing = false;
                });
            });
        });
    }
  }
}

export { CallManager };
