import { storeObjectActionCreator } from '../../source/store/action/actionCreator';
// Viene verificato che l'ActionCreator crei correttamente le azioni relative ad un oggetto Scenario

import * as stubObjects from '../stubs/stubObjects.spec';

describe('Lo storeObjectActionCreator', () => {
  it('crea un\'azione di tipo INSERT_SCENARIO', () => {
    const actionScenarioInsert = storeObjectActionCreator(
      stubObjects.objectScenario ,stubObjects.actionTypeInsertScenario);
    expect(actionScenarioInsert).toEqual(stubObjects.actionScenarioDefinedInsert);
  });
  it('crea un\'azione di tipo EDIT_SCENARIO', () => {
    const actionScenarioEdit = storeObjectActionCreator(
      stubObjects.objectScenario ,stubObjects.actionTypeEditScenario);
    expect(actionScenarioEdit).toEqual(stubObjects.actionScenarioDefinedUpdate);
  });
  it('crea un\'azione di tipo VIEW_SCENARIO', () => {
    const actionScenarioDelete = storeObjectActionCreator(
      stubObjects.objectScenario ,stubObjects.actionTypeDeleteScenario);
    expect(actionScenarioDelete).toEqual(stubObjects.actionScenarioDefinedDelete);
  });
});
