/*
 * Author: Giovanni Prete
 * File: source/store/types/scenario.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { StoreObject } from './storeObjects';

/**
 * rappresenta le tipologie di scenario
 */
export enum ScenarioType {
  'Ciclone',
  'Siccità',
  'Terremoto',
  'Incendio',
  'Inondazione',
  'Frana',
  'Rottura_di_macchinari',
  'Tornado',
  'Eruzione_vulcanica',
}

/**
 * rappresenta uno scenario di danno
 */
export interface Scenario extends StoreObject {
  /**
   * rappresenta il nome dello scenario
   */
  readonly name: string;
  /**
   * rappresenta una descrizione per lo scenario
   */
  readonly description: string;
  /**
   * rappresenta la tipologia di scenario
   */
  readonly scenario_type: ScenarioType;
  /**
   * rappresenta l'area in cui lo scenario viene applicato
   */
  readonly application_area: string;
  /**
   * rappresenta l'intensità dello scenario
   */
  readonly intensity_measure: number;
  /**
   * rappresenta la probabilità che l'evento accada
   */
  readonly p_s: number;
  /**
   * rappresenta la durata dell'evento
   */
  readonly event_time: number;
}
