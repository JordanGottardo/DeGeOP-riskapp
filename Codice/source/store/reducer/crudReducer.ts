/*
 * Author: Giovanni Prete
 * File: source/store/reducer/crudReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, OperationType } from '../action/actionInterface';
import { StoreObject } from '../types/storeObjects';

const crudReducer: ReducerInterface<StoreObject> = (
      list = [], action: ActionInterface<StoreObject>) => {

  let newList = list;

  switch (action.operation) {
    case OperationType.INSERT :
      newList = [...list, action.payload];
      break;

    case OperationType.EDIT :
      newList = list.map((obj: StoreObject) => {
        if (obj.uuid !== action.payload.uuid) {
          return obj;
        }
        return action.payload;
      });
      break;

    case OperationType.VIEW :
      newList = list.filter((obj: StoreObject) => {
        return (obj.uuid !== action.payload.uuid);
      });
      break;

    default:
      newList = list;
      break;
  }

  return newList;
};

export { crudReducer };
