/*
 * Author: Giovanni Prete
 * File: source/store/action/actionInterface.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { ReactDataOptionsInterface } from '../types/reactDataOptionsInterface';
import { SidebarTypeInterface } from '../../components/sidebar/sidebarTypeInterface';
import { StoreObject } from '../types/storeObjects';

export enum OperationType {
  'INSERT',
  'EDIT',
  'VIEW',
  'UPDATE',
  'START',
}

export enum ElementType {
  'ASSET',
  'NODE',
  'EDGE',
  'SCENARIO',
  'ANALYSIS',
  'REACTDATA',
  'CONTAINER',
}

export interface ActionInterface<P> {
  operation: OperationType;
  payload: P;
  type: ElementType;
}

export interface ActionTypeInterface {
  operationType: OperationType;
  elementType: ElementType;
}

export type StoreObjectActionCreatorInterface =
(sidebarType: SidebarTypeInterface, object: StoreObject) => ActionInterface<StoreObject>;

export type ReactDataActionCreatoreInterface =
(object: ReactDataOptionsInterface) => ActionInterface<ReactDataOptionsInterface>;

export type ActionCreatorInterface =
(object: StoreObject | ReactDataOptionsInterface | string[], actionType?: ActionTypeInterface)
=> ActionInterface<StoreObject | ReactDataOptionsInterface | string[]>;
