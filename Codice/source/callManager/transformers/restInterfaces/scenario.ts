/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restInterfaces/scenario.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
export interface RestScenario {
  uuid: string;
  time_unit: string;
  simulation_time: number;
  hazard_scenario: boolean;
  customer: string;
  scenario_type: string;
  p_s: number;
  name: string;
  application_area: string;
  description: string;
  event_time: number;
  intensity_measure: number;
}

export default RestScenario;
