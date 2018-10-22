/*
 * Author: Giovanni Prete
 * File: source/store/action/actionCreator.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */

import {
  StoreObjectActionCreatorInterface, ActionInterface,
  ActionCreatorInterface, OperationType, ElementType, ActionTypeInterface,
} from './actionInterface';
import { StoreObject } from '../types/storeObjects';

export const storeObjectActionCreator: ActionCreatorInterface =
(obj: StoreObject, actionType: ActionTypeInterface): ActionInterface<StoreObject> => {
  return {
    operation: actionType.operationType,
    payload: obj,
    type: actionType.elementType,
  };
};

export const startAnalysisActionCreator: ActionCreatorInterface =
(obj: string[]) => {
  return {
    operation: OperationType.START,
    payload: obj,
    type: ElementType.ANALYSIS,
  };
};

export const consumeAnalysisActionCreator: ActionCreatorInterface =
(obj: string[]) => {
  return {
    operation: OperationType.VIEW,
    payload: obj,
    type: ElementType.ANALYSIS,
  };
};
