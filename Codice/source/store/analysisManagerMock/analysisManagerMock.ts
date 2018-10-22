/*
 * Author: Jordan Gottardo
 * File: source/store/analysisManagerMock/analysisManagerMock.ts
 * Creation date: 2017-08-15
 * Last modified: 2017-08-22
 */
// import { store } from '../../index';
import { store } from '../../app';
import { StoreInterface } from '../types/storeInterface';
import { generateNewUUID } from '../types/uuid';
import { Container, ContainerResultInterface, ContainerStatus } from '../types/container';
import { consumeAnalysisActionCreator, storeObjectActionCreator } from '../action/actionCreator';
import { ElementType, OperationType } from '../action/actionInterface';
import { updateReactData } from '../action/reactDataAction';
import { getContainerFromScenarioUuid, getScenarioFromUuid } from '../../storeUtils/storeUtils';
import { calculateContainerResult } from '../analysisAlgorithm/calculateContainerResult';

export const startAnalysisManagerMock = () => {
  store.subscribe(sendAnalysis);
};

const sendAnalysis = () => {
  const state: StoreInterface = store.getState();
  const containers: Container[] = state.containers;
  const requestedAnalysis: string[] = state.requestedAnalysis;
  const isAnalyzing = state.reactData.isAnalyzing;
  if (!isAnalyzing && requestedAnalysis.length > 0) {
    store.dispatch(updateReactData({
      isAnalyzing: true,
    }));

    for (const analysis of requestedAnalysis) {
      const containerToDelete = getContainerFromScenarioUuid(containers, analysis);
      if (containerToDelete !== undefined) {
        store.dispatch(storeObjectActionCreator(containerToDelete, {
          operationType: OperationType.VIEW,
          elementType: ElementType.CONTAINER,
        }));
      }

      const container: Container = {
        uuid: generateNewUUID(),
        scenario: analysis,
        status: ContainerStatus.STATUS_EMPTY,
        result: null,
      };
      // Aggiungo container
      store.dispatch(storeObjectActionCreator(container, {
        operationType: OperationType.INSERT,
        elementType: ElementType.CONTAINER,
      }));
      setTimeout(() => {
        const newContainer: Container = { ...container, status: ContainerStatus.STATUS_CREATED };
        store.dispatch(storeObjectActionCreator(newContainer, {
          operationType: OperationType.EDIT,
          elementType: ElementType.CONTAINER,
        }));
        setTimeout(() => {
          const newContainer2:
            Container = { ...container, status: ContainerStatus.STATUS_IN_QUEUE };
          store.dispatch(storeObjectActionCreator(newContainer2, {
            operationType: OperationType.EDIT,
            elementType: ElementType.CONTAINER,
          }));
          setTimeout(() => {
            const newContainer3:
              Container = { ...container, status: ContainerStatus.STATUS_STARTED };
            store.dispatch(storeObjectActionCreator(newContainer3, {
              operationType: OperationType.EDIT,
              elementType: ElementType.CONTAINER,
            }));
            setTimeout(() => {
              const newContainer4
                : Container = { ...container, status: ContainerStatus.STATUS_VALIDATED };
              store.dispatch(storeObjectActionCreator(newContainer4, {
                operationType: OperationType.EDIT,
                elementType: ElementType.CONTAINER,
              }));
              setTimeout(() => {
                const nodes = state.nodes;
                const edges = state.edges;
                const scenario = getScenarioFromUuid(state.scenarios, container.scenario);
                const containerResult =
                  calculateContainerResult(nodes, edges, scenario);
                const newContainer5: Container
                  = { ...container, status: ContainerStatus.STATUS_COMPLETED, ...containerResult };
                console.log('calculateContainerResult', newContainer5);
                store.dispatch(storeObjectActionCreator(newContainer5, {
                  operationType: OperationType.EDIT,
                  elementType: ElementType.CONTAINER,
                }));
              },         getRandomWaitTime());
            },         getRandomWaitTime());
          },         getRandomWaitTime());
        },         getRandomWaitTime());
      },         getRandomWaitTime());
      // Rimuovo requestedAnalysis
      store.dispatch(consumeAnalysisActionCreator([analysis]));
    }
    store.dispatch(updateReactData({
      isAnalyzing: false,
    }));
  }
};

// Ritorna da 1000 a 5000 ms
const getRandomWaitTime = () => {
  let num =  Math.floor((Math.random() * 3000) + 500) % 3000;
  if (num < 500) {
    num = 500;
  }
  return num;
};
