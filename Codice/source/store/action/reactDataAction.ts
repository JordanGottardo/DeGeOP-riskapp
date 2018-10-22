/*
 * Author: Giovanni Prete
 * File: source/store/action/reactDataAction.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import {
  ActionCreatorInterface, ActionInterface, OperationType,
  ElementType,
} from './actionInterface';
import { ReactDataOptionsInterface } from '../types/reactDataOptionsInterface';
/**
 * Restituisce l'azione relativa alla modifica di reactdata
 * @param reactData
 * @returns {{operation: OperationType, payload: any, type: ElementType}}
 */
const updateReactData: ActionCreatorInterface =
(reactData: ReactDataOptionsInterface): ActionInterface<ReactDataOptionsInterface> => {
  return {
    operation: OperationType.UPDATE,
    payload: reactData,
    type: ElementType.REACTDATA,
  };
};

export { updateReactData };
