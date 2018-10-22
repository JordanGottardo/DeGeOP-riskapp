/*
 * Author: Giovanni Prete
 * File: source/store/reducer/assetDeleteReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, OperationType } from '../action/actionInterface';
import { Asset } from '../types/asset';
import { Edge } from '../types/edge';
import { BaseNode } from '../types/node';

const assetDelete: ReducerInterface<Asset> = (
  state = {}, action: ActionInterface<Asset>) => {

  let newNodeList = state.nodes;
  let newEdgeList = state.edges;
  if (action.operation === OperationType.VIEW) {
    for (const currentNode of state.nodes) {
      if (currentNode.asset === action.payload.uuid) {
        newEdgeList = newEdgeList.filter((edge: Edge) => {
          return (edge.node_from !== currentNode.uuid &&
            edge.node_to !== currentNode.uuid);
        });
        newNodeList = newNodeList.filter((node: BaseNode) => {
          return (node.asset !== action.payload.uuid);
        });
      }
    }
  }

  const newState = { ...state, nodes: newNodeList, edges: newEdgeList };
  return newState;
};

export { assetDelete };
