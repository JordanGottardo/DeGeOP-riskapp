// Viene verificato che l'edge esegua correttamente l'azione ricevuta sulla lista di Edge
import { Edge } from '../../source/store/types/edge';
import { edge } from '../../source/store/reducer/edgeReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('L\'EdgeReducer', () => {
  it('aggiunge un Edge valido alla lista', () => {
    const newList = edge(stubStore.edges, stubObjects.actionEdgeDefinedInsert);
    const newEdge = stubObjects.objectEdge;
    expect(newList.length).toBe(stubStore.edges.length + 1);
    expect(newList[newList.length - 1]).toEqual(newEdge);
  });
  it('rimuove un Edge valido dalla lista', () => {
    const newList = edge(stubStore.edges, stubObjects.actionEdgeDefinedDelete);
    const newEdge = stubObjects.objectEdge;
    expect(newList.lastIndexOf(newEdge)).toBe(-1);
  });
  it('aggiorna un Edge valido', () => {
    const newList = edge(stubStore.edges, stubObjects.actionEdgeDefinedUpdate);
    const newEdge = stubObjects.objectEdge;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.actionEdgeDefinedUpdate.payload.uuid);
    })).toEqual(newEdge);
  });
});
