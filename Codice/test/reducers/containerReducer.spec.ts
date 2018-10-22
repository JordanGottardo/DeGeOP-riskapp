// Viene verificato che il containerReducer esegua
// correttamente l'azione ricevuta sulla lista dei container

import { Container } from '../../source/store/types/container';
import { container } from '../../source/store/reducer/containerReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('Il ContainerReducer', () => {
  it('aggiunge un Container valido alla lista', () => {
    const newList = container(stubStore.containers, stubObjects.actionContainerDefinedInsert);
    const newContainer = stubObjects.objectContainer;
    expect(newList.length).toBe(stubStore.containers.length + 1);
    expect(newList[newList.length - 1]).toEqual(newContainer);
  });
  it('rimuove un Container valido dalla lista', () => {
    const newList = container(stubStore.containers, stubObjects.actionContainerDefinedDelete);
    const newContainer = stubObjects.objectContainer;
    expect(newList.lastIndexOf(newContainer)).toBe(-1);
  });
  it('aggiorna un Container valido', () => {
    const newList = container(stubStore.containers, stubObjects.actionContainerDefinedUpdate);
    const newContainer = stubObjects.objectContainer;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.actionContainerDefinedUpdate.payload.uuid);
    })).toEqual(newContainer);
  });
});
