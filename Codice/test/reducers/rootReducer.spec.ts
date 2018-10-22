// Viene verificato che il Reducer invochi il reducer corretto rispetto all'azione ricevuta
import { Asset } from '../../source/store/types/asset';
import { rootReducer } from '../../source/store/reducer/rootReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('Il RootReducer', () => {
  it('aggiunge un Asset valido alla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionAssetDefinedInsert);
    const newAsset = stubObjects.objectAsset;
    expect(newState.assets.length).toBe(stubStore.assets.length + 1);
    expect(newState.assets[newState.assets.length - 1]).toEqual(newAsset);
  });
  it('rimuove un Asset valido dalla lista e tutti i suoi nodi e archi', () => {
    const oldNodes = stubStore.nodes.length;
    const oldEdges = stubStore.edges.length;
    const newState = rootReducer(stubStore, stubObjects.actionAssetDefinedDelete);
    const newAsset = stubObjects.objectAsset;
    expect(newState.assets.lastIndexOf(newAsset)).toBe(-1);
    expect(newState.nodes.length).toBeLessThan(oldNodes);
    expect(newState.edges.length).toBeLessThan(oldEdges);
  });
  it('aggiorna un Asset valido', () => {
    const newState = rootReducer(stubStore, stubObjects.actionAssetDefinedUpdate);
    const newAsset = stubObjects.objectAsset;
    expect(newState.assets.find((obj) => {
      return (obj.uuid === stubObjects.actionAssetDefinedUpdate.payload.uuid);
    })).toEqual(newAsset);
  });

  it('aggiunge un ResourceNode valido alla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionNodeResourceDefinedInsert);
    const newNode = stubObjects.objectNodeResource;
    expect(newState.nodes.length).toBe(stubStore.nodes.length + 1);
    expect(newState.nodes[newState.nodes.length - 1]).toEqual(newNode);
  });
  it('rimuove un ResourceNode valido dalla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionNodeResourceDefinedDelete);
    const newNode = stubObjects.objectNodeResource;
    expect(newState.nodes.lastIndexOf(newNode)).toBe(-1);
  });
  it('aggiorna un ResourceNode valido', () => {
    const newState = rootReducer(stubStore, stubObjects.actionNodeResourceDefinedUpdate);
    const newNode = stubObjects.objectNodeResource;
    expect(newState.nodes.find((obj) => {
      return (obj.uuid === stubObjects.objectNodeResource.uuid);
    })).toEqual(newNode);
  });

  it('aggiunge un Edge valido alla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionEdgeDefinedInsert);
    const newEdge = stubObjects.objectEdge;
    expect(newState.edges.length).toBe(stubStore.edges.length + 1);
    expect(newState.edges[newState.edges.length - 1]).toEqual(newEdge);
  });
  it('rimuove un Edge valido dalla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionEdgeDefinedDelete);
    const newEdge = stubObjects.objectEdge;
    expect(newState.edges.lastIndexOf(newEdge)).toBe(-1);
  });
  it('aggiorna un Edge valido', () => {
    const newState = rootReducer(stubStore, stubObjects.actionEdgeDefinedUpdate);
    const newEdge = stubObjects.objectEdge;
    expect(newState.edges.find((obj) => {
      return (obj.uuid === stubObjects.actionEdgeDefinedUpdate.payload.uuid);
    })).toEqual(newEdge);
  });

  it('aggiunge uno Scenario valido alla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionScenarioDefinedInsert);
    const newScenario = stubObjects.objectScenario;
    expect(newState.scenarios.length).toBe(stubStore.scenarios.length + 1);
    expect(newState.scenarios[newState.scenarios.length - 1]).toEqual(newScenario);
  });
  it('rimuove uno Scenario valido dalla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionScenarioDefinedDelete);
    const newScenario = stubObjects;
    expect(newState.scenarios.lastIndexOf(newScenario)).toBe(-1);
  });
  it('aggiorna uno Scenario valido', () => {
    const newState = rootReducer(stubStore, stubObjects.actionScenarioDefinedUpdate);
    const newScenario = stubObjects.objectScenario;
    expect(newState.scenarios.find((obj) => {
      return (obj.uuid === stubObjects.actionScenarioDefinedUpdate.payload.uuid);
    })).toEqual(newScenario);
  });

  it('aggiunge un Container valido alla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionContainerDefinedInsert);
    const newContainer = stubObjects.objectContainer;
    expect(newState.containers.length).toBe(stubStore.containers.length + 1);
    expect(newState.containers[newState.containers.length - 1]).toEqual(newContainer);
  });
  it('rimuove un Container valido dalla lista', () => {
    const newState = rootReducer(stubStore, stubObjects.actionContainerDefinedDelete);
    const newContainer = stubObjects.objectContainer;
    expect(newState.containers.lastIndexOf(newContainer)).toBe(-1);
  });
  it('aggiorna un Container valido', () => {
    const newState = rootReducer(stubStore, stubObjects.actionContainerDefinedUpdate);
    const newContainer = stubObjects.objectContainer;
    expect(newState.containers.find((obj) => {
      return (obj.uuid === stubObjects.actionContainerDefinedUpdate.payload.uuid);
    })).toEqual(newContainer);
  });

  it('aggiunge un array di Analysis valido alla lista', () => {
    const newState = rootReducer(
      stubStore, stubObjects.actionAnalysisDefinedStart);
    const newAnalysis = stubObjects.objectAnalysis;
    expect(newState.requestedAnalysis.length).toBe(stubStore.requestedAnalysis.length + 1);
    expect(newState.requestedAnalysis).toEqual(newAnalysis);
  });
  it('consuma un array di Analysis valido dalla lista', () => {
    const newState = rootReducer(
      stubStore, stubObjects.actionAnalysisDefinedConsume);
    const newAnalysis = stubObjects.objectAnalysis;
    expect(newState.requestedAnalysis.lastIndexOf(newAnalysis[0])).toBe(-1);
  });

  it('cambia l\'opzione sidebarType', () => {
    const newState = rootReducer(stubStore, stubObjects.actionSideBarTypeOption);
    expect(newState.reactData.sidebarType).toEqual(stubObjects.objectOptionSidebarType.sidebarType);
  });
  it('cambia l\'opzione dialogVisibility', () => {
    const newState = rootReducer(
      stubStore, stubObjects.actionObjectDialogVisibilityOption);
    expect(newState.reactData.dialogVisibility).toEqual(
      stubObjects.objectDialogVisibility.dialogVisibility);
  });
});
