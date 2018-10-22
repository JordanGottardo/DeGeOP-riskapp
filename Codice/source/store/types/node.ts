/*
 * Author: Giovanni Prete
 * File: source/store/types/node.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { StoreObject } from './storeObjects';
import { Coordinates } from '../types/coordinates';

// export enum NodeTypes {
//   'Exit',
//   'Machine',
//   'Queue',
//   'Resource',
//   'Source',
// }

/**
 * rappresenta le tipologie di un nodo
 */
export enum NodeTypes {
  'Uscita',
  'Macchina',
  'Coda',
  'Risorsa',
  'Sorgente',
}

/**
 * rappresenta un nodo di tipo Uscita
 */
export interface Exit {
  /**
   * rappresenta la classe del nodo
   */
  readonly node_class: NodeTypes.Uscita;
}

/**
 * rappresenta un nodo di tipo Macchina
 */
export interface Machine {
  /**
   * rappresenta la classe del nodo
   */
  readonly node_class: NodeTypes.Macchina;
  /**
   * rappresenta la capacità del nodo
   */
  readonly capacity: number;
  /**
   * rappresenta il tempo di processo del nodo
   */
  readonly processingTime: number;
  /**
   * rappresenta il valore del nodo
   */
  readonly value: number;
}

/**
 * rappresenta un nodo di tipo Coda
 */
export interface Queue {
  /**
   * rappresenta la classe del nodo
   */
  readonly node_class: NodeTypes.Coda;
  /**
   * rappresenta la capacità del nodo coda
   */
  readonly capacity: number;
}

/**
 * rappresenta un nodo di tipo Risorsa
 */
export interface Resource {
  /**
   * rappresenta la classe del nodo
   */
  readonly node_class: NodeTypes.Risorsa;
}

/**
 * rappresenta un nodo di tipo Sorgente
 */
export interface Source {
  /**
   * rappresenta la classe del nodo
   */
  readonly node_class: NodeTypes.Sorgente;
  /**
   * rappresenta il tempo di approvvigionamento del nodo
   */
  readonly leadTime: number;
}

/**
 * rappresenta un nodo contenuto all’interno di un Asset
 */
export interface BaseNode extends StoreObject {
  /**
   * rappresenta un'etichetta per il nodo
   */
  readonly label: string;
  /**
   * rappresenta l’asset a cui il nodo appartiene
   */
  readonly asset: string;
  /**
   * rappresenta la classe del nodo
   */
  readonly node_class: NodeTypes;
  /**
   * rappresenta le coordinate di locazione del nodo
   */
  readonly coordinate: string;
}

export type Node<O> = BaseNode & O;

export type AllNodeTypes = Node<Exit> | Node<Machine> | Node<Queue> |
Node<Resource> | Node<Source>;
