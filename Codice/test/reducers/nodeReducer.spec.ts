// Viene verificato che il NodeReducer esegua correttamente l'azione ricevuta sulla lista di Node
import { Node } from '../../source/store/types/node';
import { node } from '../../source/store/reducer/nodeReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('Il NodeReducer', () => {
  it('aggiunge un ResourceNode valido alla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedInsert);
    const newNode = stubObjects.objectNodeResource;
    expect(newList.length).toBe(stubStore.nodes.length + 1);
    expect(newList[newList.length - 1]).toEqual(newNode);
  });
  it('aggiunge un ExitNode valido alla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeExitDefinedInsert);
    const newNode = stubObjects.objectNodeExit;
    expect(newList.length).toBe(stubStore.nodes.length + 1);
    expect(newList[newList.length - 1]).toEqual(newNode);
  });
  it('aggiunge un QueueNode valido alla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeQueueDefinedInsert);
    const newNode = stubObjects.objectNodeQueue;
    expect(newList.length).toBe(stubStore.nodes.length + 1);
    expect(newList[newList.length - 1]).toEqual(newNode);
  });
  it('aggiunge un SourceNode valido alla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeSourceDefinedInsert);
    const newNode = stubObjects.objectNodeSource;
    expect(newList.length).toBe(stubStore.nodes.length + 1);
    expect(newList[newList.length - 1]).toEqual(newNode);
  });
  it('aggiunge un MachineNode valido alla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeMachineDefinedInsert);
    const newNode = stubObjects.objectNodeMachine;
    expect(newList.length).toBe(stubStore.nodes.length + 1);
    expect(newList[newList.length - 1]).toEqual(newNode);
  });

  it('rimuove un ResourceNode valido dalla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedDelete);
    const newNode = stubObjects.objectNodeResource;
    expect(newList.lastIndexOf(newNode)).toBe(-1);
  });
  it('rimuove un ExitNode valido dalla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedDelete);
    const newNode = stubObjects.objectNodeExit;
    expect(newList.lastIndexOf(newNode)).toBe(-1);
  });
  it('rimuove un QueueNode valido dalla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedDelete);
    const newNode = stubObjects.objectNodeQueue;
    expect(newList.lastIndexOf(newNode)).toBe(-1);
  });
  it('rimuove un SourceNode valido dalla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedDelete);
    const newNode = stubObjects.objectNodeSource;
    expect(newList.lastIndexOf(newNode)).toBe(-1);
  });
  it('rimuove un MachineNode valido dalla lista', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedDelete);
    const newNode = stubObjects.objectNodeMachine;
    expect(newList.lastIndexOf(newNode)).toBe(-1);
  });

  it('aggiorna un ResourceNode valido', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeResourceDefinedUpdate);
    const newNode = stubObjects.objectNodeResource;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.objectNodeResource.uuid);
    })).toEqual(newNode);
  });
  it('aggiorna un ExitNode valido', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeExitDefinedUpdate);
    const newNode = stubObjects.objectNodeExit;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.objectNodeExit.uuid);
    })).toEqual(newNode);
  });
  it('aggiorna un QueueNode valido', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeQueueDefinedUpdate);
    const newNode = stubObjects.objectNodeQueue;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.objectNodeQueue.uuid);
    })).toEqual(newNode);
  });
  it('aggiorna un SourceNode valido', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeSourceDefinedUpdate);
    const newNode = stubObjects.objectNodeSource;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.objectNodeSource.uuid);
    })).toEqual(newNode);
  });
  it('aggiorna un MachineNode valido', () => {
    const newList = node(stubStore.nodes, stubObjects.actionNodeMachineDefinedUpdate);
    const newNode = stubObjects.objectNodeMachine;
    expect(newList.find((obj) => {
      return (obj.uuid === stubObjects.objectNodeMachine.uuid);
    })).toEqual(newNode);
  });

  // it('non esegue nessuna azione se la tipologia di operazione non è supportata', () => {
  //   const newList = node(stubStore.nodes, stubObjects.actionTestOperation);
  //   expect(newList).toEqual(stubStore.nodes);
  // });
  // it('crea una lista vuota ed esegue l\'operazione se quella iniziale non è definita', () => {
  //   const newList = node(undefined, stubObjects.actionTestOperation);
  //   expect(newList).toEqual(stubStore.nodeEmpty);
  // });
});
