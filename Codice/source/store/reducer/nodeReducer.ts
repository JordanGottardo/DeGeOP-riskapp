/*
 * Author: Giovanni Prete
 * File: source/store/reducer/nodeReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, ElementType } from '../action/actionInterface';
import { BaseNode } from '../types/node';

const node: ReducerInterface<BaseNode> = (nodeList = [], action: ActionInterface<BaseNode>) => {

  let newList = nodeList;

  if (action.type === ElementType.NODE) {
    newList = crudReducer(nodeList, action);
  }

  return newList;
};

export { node };
