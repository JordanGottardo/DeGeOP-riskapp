// Viene verificato che lo ScenarioReducer esegua correttamente l'azione
// ricevuta sulla lista di Scenario

import { Scenario } from '../../source/store/types/scenario';
import { scenario } from '../../source/store/reducer/scenarioReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('Lo ScenarioReducer', () => {
  it('aggiunge uno Scenario valido alla lista', () => {
    const newList = scenario(stubStore.scenarios, stubObjects.actionScenarioDefinedInsert);
    const newScenario = stubObjects.objectScenario;
    expect(newList.length).toBe(stubStore.scenarios.length + 1);
    expect(newList[newList.length - 1]).toEqual(newScenario);
  });
  it('rimuove uno Scenario valido dalla lista', () => {
    const newList = scenario(stubStore.scenarios, stubObjects.actionScenarioDefinedDelete);
    const newScenario = stubObjects.objectScenario;
    expect(newList.lastIndexOf(newScenario)).toBe(-1);
  });
  it('aggiorna uno Scenario valido', () => {
    const newList = scenario(stubStore.scenarios, stubObjects.actionScenarioDefinedUpdate);
    const newScenario = stubObjects.objectScenario;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.actionScenarioDefinedUpdate.payload.uuid);
    })).toEqual(newScenario);
  });
});
