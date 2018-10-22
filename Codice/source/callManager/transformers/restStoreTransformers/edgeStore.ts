/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restStoreTransformers/edgeStore.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { RestStoreTransform } from '../transformInterface';
import { OperationType, ElementType } from '../../../store/action/actionInterface';
import { Edge } from '../../../store/types/edge';
import RestEdge from '../restInterfaces/edge';

const edgeStore: RestStoreTransform<RestEdge, Edge> =
  (edge: RestEdge) => {
    return {
      type: ElementType.EDGE,
      operation: OperationType.INSERT,
      payload: edge,
    };
  };

export default edgeStore;
