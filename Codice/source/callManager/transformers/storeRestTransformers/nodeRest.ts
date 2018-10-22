/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/storeRestTransformers/nodeRest.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../../../store/action/actionInterface';
import { StoreRestTransform } from '../transformInterface';
import { Machine, Node, NodeTypes, Queue, Source } from '../../../store/types/node';
import { RestNode, EavValues } from '../restInterfaces/node';
import { nodeClassMap, nodeShapeMap } from '../callManagerUtils/callManagerUtils';
import { convertSRIDToArray } from '../../../components/mapComponent/mapUtils/mapUtils';

const nodeRest: StoreRestTransform<Node<any>, RestNode> = (action: ActionInterface<Node<any>>) => {
  const coord = convertSRIDToArray(action.payload.coordinate);
  console.log('COOOORD', coord);
  const baseNode = {
    uuid: action.payload.uuid,
    label: action.payload.label,
    asset: action.payload.asset,
    node_class: nodeClassMap[action.payload.node_class],
    color: '#08494f',
    shape: nodeShapeMap[action.payload.node_class],
    x: Number(coord[0][0][0]).toFixed(16),
    y: Number(coord[0][0][1]).toFixed(16),
    coordinate: action.payload.coordinate,
  };

  const nodeClass = action.payload.node_class;
  let eavValues: EavValues[] = [];
  if (nodeClass === NodeTypes.Uscita) {
    eavValues = [];
  } else if (nodeClass === NodeTypes.Macchina) {
    const node = action.payload as Node<Machine>;
    eavValues = [{
      slug: 'capacity',
      value: node.capacity.toString(),
    },
      {
        slug: 'machineries',
        value: 'general machineries',
      },
      {
        slug: 'processing-time',
        value: node.processingTime.toString(),
      },
      {
        slug: 'value',
        value: node.value.toString(),
      }];
  } else if (nodeClass === NodeTypes.Coda) {
    const node = action.payload as Node<Queue>;
    eavValues = [{
      slug: 'capacity',
      value: node.capacity.toString(),
    },
      {
        slug: 'contents',
        value: 'commercial shelving',
      }];
  } else if (nodeClass === NodeTypes.Risorsa) {
    eavValues = [];
  } else if (nodeClass === NodeTypes.Sorgente) {
    const node = action.payload as Node<Source>;
    eavValues = [{
      slug: 'inter-arrival-time',
      value: node.leadTime.toString(),
    }];
  }

  const restNode: any = { ...baseNode, eav_values: eavValues };
  return restNode;
};

export default nodeRest;
