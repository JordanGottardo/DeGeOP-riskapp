/*
 * Author: Giovanni Prete
 * File: source/store/types/coordinates.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */

/**
 * Rappresenta le coordinate su mappa
 */
export interface Coordinates {
  /**
   * valore delle ascisse
   */
  x: number;
  /**
   * valore delle ordinate
   */
  y: number;
}

export type Polygon = Coordinates[];
