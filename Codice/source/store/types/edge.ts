/*
 * Author: Giovanni Prete
 * File: source/store/types/edge.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { StoreObject } from './storeObjects';

/**
 * rappresenta un arco che collega due nodi tra di loro; un arco indica che i nodi sono
 * in correlazione tra di loro
 */
export interface Edge extends StoreObject {
  /**
   * rappresenta il nodo di partenza
   */
  readonly node_from: string;
  /**
   * rappresenta il nodo di arrivo
   */
  readonly node_to: string;
}
