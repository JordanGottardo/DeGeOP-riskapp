/*
 * Author: Giovanni Prete
 * File: source/store/types/asset.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { StoreObject } from './storeObjects';
import { Polygon } from './coordinates';

// export enum AssetTypes {
//   'Bricks',
//   'Precast Concrete',
//   'Steel',
//   'Wood',
//   'Waterfront Structures',
// }

/**
 * Rappresenta la tipologia di fabbricato
 */
export enum AssetTypes {
  'Mattoni',
  'Cemento_prefabbricato',
  'Acciaio',
  'Legno',
  'Struttura_costiera',
}

// export enum AssetOwner {
//   'Customer',
//   'Client',
//   'Supplier',
// }

/**
 * Rappresenta la tipologia del proprietario dell'Asset
 */
export enum AssetOwner {
  'Cliente',
  'Assicurando',
  'Fornitore',
}

/**
 * Rappresenta il colore dell'asset
 */
export interface Color {
  a: number;
  b: number;
  g: number;
  r: number;
}

/**
 * rappresenta un fabbricato di interesse per il processo produttivo dell’assicurando
 */
export interface Asset extends StoreObject {
  /**
   * rappresenta il nome dell’asset
   */
  readonly name: string;
  /**
   * rappresenta il nome dell’asset
   */
  readonly type: AssetTypes;
  /**
   * rappresenta l’appartenenza dell’asset
   */
  readonly belong_to: AssetOwner;
  /**
   * rappresenta la dimensione, in mq, dell’asset
   */
  readonly surface: number;
  /**
   * indica il valore economico dell’asset
   */
  readonly unitValue: number;
  /**
   * indica il colore dell’asset
   */
  readonly color: Color;
  /**
   * rappresenta la descrizione dell’asset
   */
  readonly description: string;
  /**
   * rappresenta le coordinate dell'asset
   */
  readonly geoshape: string;
}
