// Viene verificato che l'AssetDeleteReducer esegua correttamente l'azione
// ricevuta sulla lista di Node e Edge

import { Asset } from '../../source/store/types/asset';
import { assetDelete } from '../../source/store/reducer/assetDeleteReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('L\'AssetDeleteReducer', () => {
  it('rimuove tutti i nodi e gli archi contenuti in un Asset', () => {
    const oldNodes = stubStore.nodes.length;
    const oldEdges = stubStore.edges.length;
    const newState = assetDelete(stubStore, stubObjects.actionAssetDefinedDelete);
    const newAsset = stubObjects.objectAsset;
    expect(newState.nodes.length).toBeLessThan(oldNodes);
    expect(newState.edges.length).toBeLessThan(oldEdges);
  });
});
