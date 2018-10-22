/*
 * Author: Giovanni Prete
 * File: source/store/reducer/scenarioReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, ElementType } from '../action/actionInterface';
import { Scenario } from '../types/scenario';

const scenario: ReducerInterface<Scenario> = (
      scenarioList = [], action: ActionInterface<Scenario>) => {

  let newList = scenarioList;

  if (action.type === ElementType.SCENARIO) {
    newList = crudReducer(scenarioList, action);
  }

  return newList;
};

export { scenario };
