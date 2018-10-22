/*
 * Author: Giovanni Prete
 * File: source/store/types/storeObjects.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */

import { Asset } from './asset';
import { AllNodeTypes } from './node';
import { Edge } from './edge';
import { Scenario } from './scenario';

/**
 * rappresenta un generico oggetto nello store
 */
export interface StoreObject {
  /**
   * rappresenta l'identificativo per ogni oggetto presente nello store
   */
  readonly uuid: string;
}

export type AllElementsInterface =  Asset | AllNodeTypes | Edge | Scenario;
