// Viene verificato che l'ActionCreator crei correttamente le azioni relative ad un oggetto Asset

import { storeObjectActionCreator } from '../../source/store/action/actionCreator';
import * as stubObjects from '../stubs/stubObjects.spec';

describe('Lo storeObjectActionCreator', () => {
  it('crea un\'azione di tipo INSERT_ASSET', () => {
    const actionAssetInsert = storeObjectActionCreator(
      stubObjects.objectAsset ,stubObjects.actionTypeInsertAsset);
    expect(actionAssetInsert).toEqual(stubObjects.actionAssetDefinedInsert);
  });
  it('crea un\'azione di tipo EDIT_ASSET', () => {
    const actionAssetEdit = storeObjectActionCreator(
      stubObjects.objectAsset ,stubObjects.actionTypeEditAsset);
    expect(actionAssetEdit).toEqual(stubObjects.actionAssetDefinedUpdate);
  });
  it('crea un\'azione di tipo VIEW_ASSET', () => {
    const actionAssetDelete = storeObjectActionCreator(
      stubObjects.objectAsset ,stubObjects.actionTypeDeleteAsset);
    expect(actionAssetDelete).toEqual(stubObjects.actionAssetDefinedDelete);
  });
});
