/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/storeRestTransformers/edgeRest.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../../../store/action/actionInterface';
import { StoreRestTransform } from '../transformInterface';
import { Edge } from '../../../store/types/edge';
import RestEdge from '../restInterfaces/edge';

const edgeRest: StoreRestTransform<Edge, RestEdge> =
  (action: ActionInterface<Edge>) => {
    return {
      uuid: action.payload.uuid,
      node_from: action.payload.node_from,
      node_to: action.payload.node_to,
    };
  };

export default edgeRest;
