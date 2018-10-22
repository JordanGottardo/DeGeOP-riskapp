/*
 * Author: Giovanni Prete
 * File: source/store/reducer/rootReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { defaultStore, StoreInterface } from '../types/storeInterface';
import { ActionInterface, OperationType, ElementType } from '../action/actionInterface';
import { ReducerInterface } from './reducerInterface';
import { asset } from './assetReducer';
import { node } from './nodeReducer';
import { edge } from './edgeReducer';
import { assetDelete } from './assetDeleteReducer';
import { scenario } from './scenarioReducer';
import { container } from './containerReducer';
import { requestedAnalysis } from './analysisReducer';
import { reactData } from './reactDataReducer';

const rootReducer: ReducerInterface<any> = (oldState: StoreInterface = defaultStore,
                                            action: ActionInterface<any>) => {
  let newState = oldState;

  switch (action.type) {
    case ElementType.ASSET :
      newState = { ...newState, assets: asset(newState.assets, action) };
      if (action.operation === OperationType.VIEW) {
        newState = assetDelete(newState, action);
      }
      break;

    case ElementType.NODE :
      newState = { ...newState,
        nodes: node(newState.nodes, action),
        edges: edge(newState.edges, action) };
      break;

    case ElementType.EDGE :
      newState = { ...newState, edges: edge(newState.edges, action) };
      break;

    case ElementType.SCENARIO :
      newState = { ...newState,
        scenarios: scenario(newState.scenarios, action),
        containers: container(newState.containers, action) };
      break;

    case ElementType.ANALYSIS :
      newState = { ...newState, requestedAnalysis: requestedAnalysis(
            newState.requestedAnalysis, action) };
      break;

    case ElementType.CONTAINER :
      newState = { ...newState, containers: container(newState.containers, action) };
      break;

    case ElementType.REACTDATA :
      newState = { ...newState, reactData: reactData(newState.reactData, action) };
      break;

    default:
      newState = oldState;
      break;
  }

  return newState;
};

export { rootReducer };
