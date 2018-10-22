/*
 * Author: Giovanni Prete
 * File: source/store/reducer/edgeReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, OperationType, ElementType } from '../action/actionInterface';
import { Edge } from '../types/edge';

const edge: ReducerInterface<Edge> = (edgeList = [], action: ActionInterface<Edge>) => {

  let newList = edgeList;

  if (action.type === ElementType.EDGE) {
    newList = crudReducer(edgeList, action);
  }

  if (action.type === ElementType.NODE && action.operation === OperationType.VIEW) {
    newList = newList.filter((currentEdge: Edge) => {
      return (currentEdge.node_from !== action.payload.uuid &&
              currentEdge.node_to !== action.payload.uuid);
    });
  }

  return newList;
};

export { edge };
