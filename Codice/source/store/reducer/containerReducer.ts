/*
 * Author: Giovanni Prete
 * File: source/store/reducer/containerReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { crudReducer } from './crudReducer';
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, ElementType, OperationType } from '../action/actionInterface';
import { Container } from '../types/container';

const container: ReducerInterface<Container> =
(containerList = [], action: ActionInterface<Container>) => {

  let newContainerList = containerList;

  if (action.type === ElementType.CONTAINER) {
    newContainerList = crudReducer(containerList, action);
  }

  if (action.type === ElementType.SCENARIO && action.operation === OperationType.VIEW) {
    newContainerList = newContainerList.filter((associatedContainer: Container) => {
      return (associatedContainer.uuid !== action.payload.uuid);
    });
  }

  return newContainerList;
};

export { container };
