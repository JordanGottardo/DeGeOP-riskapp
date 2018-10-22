import { storeObjectActionCreator } from '../../source/store/action/actionCreator';
// Viene verificato che l'ActionCreator crei correttamente le azioni relative ad un oggetto Asset

import * as stubObjects from '../stubs/stubObjects.spec';

describe('Lo storeObjectActionCreator', () => {
  it('crea un\'azione di tipo INSERT_EDGE', () => {
    const actionEdgeInsert = storeObjectActionCreator(
      stubObjects.objectEdge ,stubObjects.actionTypeInsertEdge);
    expect(actionEdgeInsert).toEqual(stubObjects.actionEdgeDefinedInsert);
  });
  it('crea un\'azione di tipo EDIT_EDGE', () => {
    const actionEdgeEdit = storeObjectActionCreator(
      stubObjects.objectEdge ,stubObjects.actionTypeEditEdge);
    expect(actionEdgeEdit).toEqual(stubObjects.actionEdgeDefinedUpdate);
  });
  it('crea un\'azione di tipo VIEW_EDGE', () => {
    const actionEdgeDelete = storeObjectActionCreator(
      stubObjects.objectEdge ,stubObjects.actionTypeDeleteEdge);
    expect(actionEdgeDelete).toEqual(stubObjects.actionEdgeDefinedDelete);
  });
});
