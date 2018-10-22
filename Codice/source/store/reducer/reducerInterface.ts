/*
 * Author: Giovanni Prete
 * File: source/store/reducer/reducerInterface.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../action/actionInterface';

type ReducerInterface<P> = (state: any, action: ActionInterface<P>) => any;

export { ReducerInterface };
