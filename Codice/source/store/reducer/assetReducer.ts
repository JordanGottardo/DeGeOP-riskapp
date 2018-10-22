/*
 * Author: Giovanni Prete
 * File: source/store/reducer/assetReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, ElementType } from '../action/actionInterface';
import { Asset } from '../types/asset';

const asset: ReducerInterface<Asset> = (assetList = [], action: ActionInterface<Asset>) => {

  let newList = assetList;

  if (action.type === ElementType.ASSET) {
    newList = crudReducer(assetList, action);
  }

  return newList;
};

export { asset };
