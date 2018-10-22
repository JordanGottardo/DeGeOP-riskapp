/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restStoreTransformers/scenarioStore.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { RestStoreTransform } from '../transformInterface';
import { OperationType, ElementType } from '../../../store/action/actionInterface';
import { Scenario } from '../../../store/types/scenario';
import { RestScenario } from '../restInterfaces/scenario';
import { scenarioTypeMap, swapMap } from '../callManagerUtils/callManagerUtils';

const scenarioStore: RestStoreTransform<RestScenario, Scenario> =
  (scenario: RestScenario) => {
    const payload: Scenario = {
      uuid: scenario.uuid,
      name: scenario.name,
      description: scenario.description,
      scenario_type: Number(swapMap(scenarioTypeMap)[scenario.scenario_type]),
      application_area: scenario.application_area,
      intensity_measure: Number(scenario.intensity_measure),
      p_s: Number(scenario.p_s),
      event_time: Number(scenario.event_time),
    };
    return {
      payload,
      type: ElementType.SCENARIO,
      operation: OperationType.INSERT,
    };
  };

export default scenarioStore;
