/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restStoreTransformers/nodeStore.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { RestStoreTransform } from '../transformInterface';
import { OperationType, ElementType } from '../../../store/action/actionInterface';
import { AllNodeTypes, Node, NodeTypes } from '../../../store/types/node';
import { RestNode, EavValues } from '../restInterfaces/node';
import { findEavValue, nodeClassMap, swapMap } from '../callManagerUtils/callManagerUtils';
import { convertArrayToSRID } from '../../../components/mapComponent/mapUtils/mapUtils';

const nodeStore: RestStoreTransform<RestNode, AllNodeTypes> =
  (node: RestNode) => {
    const coord: [number, number] = [node.x, node.y];
    const srid = convertArrayToSRID([[coord]], 'point');
    if (node.label === 's1') {
      console.log('PIPPOS1', node);
    }
    console.log('JORDAN nodeStore', node);
    const payload = {
      uuid: node.uuid,
      label: node.label,
      asset: node.asset,
      coordinate: srid,
      node_class: Number(swapMap(nodeClassMap)[node.node_class]),
    };

    const nodeClass = payload.node_class;
    const eavValues: EavValues[] = node.eav_values;
    let additionalValues = {};
    if (nodeClass === NodeTypes.Macchina) {
      additionalValues = {
        capacity: Number(findEavValue(eavValues, 'capacity')),
        processingTime: Number(findEavValue(eavValues, 'processing-time')),
        value: Number(findEavValue(eavValues, 'value')),
      };
    } else if (nodeClass === NodeTypes.Coda) {
      additionalValues = {
        capacity: Number(findEavValue(eavValues, 'capacity')),
      };
    } else if (nodeClass === NodeTypes.Sorgente) {
      if (node.label === 's1') {
        console.log('dentro', node.eav_values);
      }
      additionalValues = {
        leadTime: Number(findEavValue(eavValues, 'inter-arrival-time')),
      };
    }
    const thePayload: AllNodeTypes = { ...payload, ...additionalValues };
    console.log('thePayload', thePayload);
    if (node.label === 's1') {
      console.log('dentroPayload', thePayload);
    }
    return {
      type: ElementType.NODE,
      operation: OperationType.INSERT,
      payload: thePayload,
    };
  };

export default nodeStore;
