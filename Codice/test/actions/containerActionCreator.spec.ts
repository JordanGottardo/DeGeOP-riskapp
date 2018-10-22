// Viene verificato che l'ActionCreator crei correttamente le azioni
// relative ad un oggetto Container

import { storeObjectActionCreator } from '../../source/store/action/actionCreator';
import * as stubObjects from '../stubs/stubObjects.spec';

describe('Lo storeObjectActionCreator', () => {
  it('crea un\'azione di tipo INSERT_CONTAINER', () => {
    const actionContainerInsert = storeObjectActionCreator(
      stubObjects.objectContainer ,stubObjects.actionTypeInsertContainer);
    expect(actionContainerInsert).toEqual(stubObjects.actionContainerDefinedInsert);
  });
  it('crea un\'azione di tipo EDIT_CONTAINER', () => {
    const actionContainerEdit = storeObjectActionCreator(
      stubObjects.objectContainer ,stubObjects.actionTypeEditContainer);
    expect(actionContainerEdit).toEqual(stubObjects.actionContainerDefinedUpdate);
  });
  it('crea un\'azione di tipo VIEW_CONTAINER', () => {
    const actionContainerDelete = storeObjectActionCreator(
      stubObjects.objectContainer ,stubObjects.actionTypeDeleteContainer);
    expect(actionContainerDelete).toEqual(stubObjects.actionContainerDefinedDelete);
  });
});
