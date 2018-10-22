/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/storeRestTransformers/scenarioRest.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../../../store/action/actionInterface';
import { StoreRestTransform } from '../transformInterface';
import { Scenario } from '../../../store/types/scenario';
import { RestScenario } from '../restInterfaces/scenario';
import { customerUuid, scenarioTypeMap } from '../callManagerUtils/callManagerUtils';

const scenarioRest: StoreRestTransform<Scenario, RestScenario> =
  (action: ActionInterface<Scenario>) => {
    return {
      uuid: action.payload.uuid,
      time_unit: 'month',
      simulation_time: 36,
      hazard_scenario: false,
      customer: customerUuid,
      scenario_type: scenarioTypeMap[action.payload.scenario_type],
      p_s: action.payload.p_s,
      name: action.payload.name,
      application_area: action.payload.application_area,
      description: action.payload.description,
      event_time: action.payload.event_time,
      intensity_measure: action.payload.intensity_measure,
    };
  };

export default scenarioRest;
