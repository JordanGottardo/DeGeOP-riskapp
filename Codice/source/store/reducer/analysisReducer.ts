/*
 * Author: Giovanni Prete
 * File: source/store/reducer/analysisReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, OperationType } from '../action/actionInterface';

const requestedAnalysis: ReducerInterface<string[]> = (
      requestedAnalysisList = [], action: ActionInterface<string[]>) => {

  let newRequestedAnalysisList = requestedAnalysisList;

  if (action.operation === OperationType.START) {
    newRequestedAnalysisList = action.payload;
  }

  if (action.operation === OperationType.VIEW) {
    newRequestedAnalysisList = newRequestedAnalysisList.filter((analysisUuid: string) => {
      return (action.payload.indexOf(analysisUuid) === -1);
    });
  }

  return newRequestedAnalysisList;
};

export { requestedAnalysis };
