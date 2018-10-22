// Viene verificato che l'AssetReducer esegua correttamente l'azione ricevuta sulla lista di Asset

import { Asset } from '../../source/store/types/asset';
import { asset } from '../../source/store/reducer/assetReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('L\'AssetReducer', () => {
  it('aggiunge un Asset valido alla lista', () => {
    const newList = asset(stubStore.assets, stubObjects.actionAssetDefinedInsert);
    const newAsset = stubObjects.objectAsset;
    expect(newList.length).toBe(stubStore.assets.length + 1);
    expect(newList[newList.length - 1]).toEqual(newAsset);
  });
  it('rimuove un Asset valido dalla lista', () => {
    const newList = asset(stubStore.assets, stubObjects.actionAssetDefinedDelete);
    const newAsset = stubObjects.objectAsset;
    expect(newList.lastIndexOf(newAsset)).toBe(-1);
  });
  it('aggiorna un Asset valido', () => {
    const newList = asset(stubStore.assets, stubObjects.actionAssetDefinedUpdate);
    const newAsset = stubObjects.objectAsset;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.actionAssetDefinedUpdate.payload.uuid);
    })).toEqual(newAsset);
  });
});
