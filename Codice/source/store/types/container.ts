/*
 * Author: Giovanni Prete
 * File: source/store/types/container.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { StoreObject } from './storeObjects';

/**
 * Rappresenta lo status del container
 */
export enum ContainerStatus {
  'STATUS_EMPTY',
  'STATUS_CREATED',
  'STATUS_IN_QUEUE',
  'STATUS_STARTED',
  'STATUS_VALIDATED',
  'STATUS_COMPLETED',
  'STATUS_ERROR',
  'STATUS_NOT_VALID',
  'STATUS_TIMED_OUT',
}

export interface NodeResultInterface {
  [index: string]: number;
}

export interface AssetResultInterface {
  [index: string]: number;
}

export interface SingleYearResultInterface {
  nodes: NodeResultInterface;
  assets: AssetResultInterface;
}

export interface ContainerResultInterface {
  1: SingleYearResultInterface;
  2: SingleYearResultInterface;
  3: SingleYearResultInterface;
}

export interface Container extends StoreObject {
  readonly scenario: string;
  readonly status: ContainerStatus;
  readonly result: ContainerResultInterface;
}
