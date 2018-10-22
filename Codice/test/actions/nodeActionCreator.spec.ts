import { storeObjectActionCreator } from '../../source/store/action/actionCreator';
// Viene verificato che l'ActionCreator crei correttamente le azioni relative ad un oggetto Asset

import * as stubObjects from '../stubs/stubObjects.spec';

describe('Lo storeObjectActionCreator', () => {
  it('crea un\'azione di tipo INSERT_NODE', () => {
    const actionNodeInsert = storeObjectActionCreator(
      stubObjects.objectNodeResource ,stubObjects.actionTypeInsertNode);
    expect(actionNodeInsert).toEqual(stubObjects.actionNodeResourceDefinedInsert);
  });
  it('crea un\'azione di tipo EDIT_NODE', () => {
    const actionNodeEdit = storeObjectActionCreator(
      stubObjects.objectNodeResource ,stubObjects.actionTypeEditNode);
    expect(actionNodeEdit).toEqual(stubObjects.actionNodeResourceDefinedUpdate);
  });
  it('crea un\'azione di tipo VIEW_NODE', () => {
    const actionNodeDelete = storeObjectActionCreator(
      stubObjects.objectNodeResource ,stubObjects.actionTypeDeleteNode);
    expect(actionNodeDelete).toEqual(stubObjects.actionNodeResourceDefinedDelete);
  });
});
