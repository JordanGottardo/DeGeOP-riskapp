/*
 * Author: Giovanni Prete
 * File: source/store/reducer/reactDataReducer.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { ReducerInterface } from './reducerInterface';
import { ActionInterface, ElementType } from '../action/actionInterface';
import { ReactDataOptionsInterface } from '../types/reactDataOptionsInterface';

const reactData: ReducerInterface<ReactDataOptionsInterface> =
(oldReactData = {}, action: ActionInterface<any>) => {

  console.log('ReactDataReducer');
  console.log(action.payload);
  let newReactData = oldReactData;

  if (action.type === ElementType.REACTDATA) {
    console.log('dentro if reactdata');
    newReactData = { ...newReactData, ...action.payload };
  }

  return newReactData;
};

export { reactData };
