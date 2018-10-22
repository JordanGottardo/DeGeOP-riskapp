/*
 * Author: Jordan Gottardo
 * File: source/storeUtils/storeUtils.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */
import { Scenario } from '../store/types/scenario';
import { ElementType } from '../store/action/actionInterface';
import {
  AssetResultInterface, Container, ContainerStatus,
  NodeResultInterface,
} from '../store/types/container';
import { BaseNode } from '../store/types/node';
import { Edge } from '../store/types/edge';
import {
  AnalysisSidebarStateInterface,
  NotAnalyzedScenario,
} from '../components/sidebar/specificSidebars/specificSidebarInterface';

export const getScenarioFromUuid = (scenarios: Scenario[], uuid: string) => {
  return scenarios.filter((scenario: Scenario) => {
    return scenario.uuid === uuid;
  })[0];
};

export const getContainerFromScenarioUuid = (containers: Container[], uuid: string) => {
  return containers.filter((container: Container) => {
    return container.scenario === uuid;
  })[0];
};

export const getNotAnalyzedScenarios =
  (scenarios: Scenario[], containers: Container[], requestedAnalysis: string[]) => {
    return scenarios.filter((scenario: Scenario) => {
      const inContainer = doesSecondObjectContain(scenario.uuid, containers, 'scenario');
      const inRequestedAnalysis =
        doesSecondObjectContain(scenario.uuid, requestedAnalysis, 'uuid');
      return !inContainer && !inRequestedAnalysis;
    });
  };

export const getCompletedContainers = (containers: Container[]) => {
  return containers.filter((container: Container) => {
    return container.status === ContainerStatus.STATUS_COMPLETED;
  });
};

const doesSecondObjectContain = (valueToFind: any, arrayToCheck: any, fieldToCheck: string) => {
  for (const element of arrayToCheck) {
    if (element[fieldToCheck] === valueToFind) {
      return true;
    }
  }
  return false;
};

export const mergeAndAddTwoResultLists = (
  firstList: NodeResultInterface | AssetResultInterface,
  secondList: NodeResultInterface | AssetResultInterface) => {
  if (secondList === null || secondList === undefined) {
    return firstList;
  }

  const mergedResult = {};
  for (const key in firstList) {
    if (firstList.hasOwnProperty(key)) {
      if (secondList.hasOwnProperty(key)) {
        mergedResult[key] = (firstList[key] + secondList[key]) / 2;
      } else {
        mergedResult[key] = firstList[key];
      }
    }
  }

  for (const key in secondList) {
    if (secondList.hasOwnProperty(key)) {
      if (!mergedResult.hasOwnProperty(key)) {
        mergedResult[key] = secondList[key];
      }
    }
  }

  return mergedResult;
};

export const mergeTwoAnalysisStates = (
  oldState: AnalysisSidebarStateInterface, newState: AnalysisSidebarStateInterface):
  AnalysisSidebarStateInterface => {
  const realNewState: AnalysisSidebarStateInterface = {
    notAnalyzedScenarios: [],
  };
  newState.notAnalyzedScenarios.forEach((notNewAnalyzedScenario: NotAnalyzedScenario) => {
    let requested = false;
    for (const notOldAnalyzedScenario of oldState.notAnalyzedScenarios) {
      if (notOldAnalyzedScenario.scenario.uuid === notNewAnalyzedScenario.scenario.uuid) {
        requested = notOldAnalyzedScenario.toRequest;
      }
    }
    realNewState.notAnalyzedScenarios.push({ ...notNewAnalyzedScenario, toRequest: requested });
  });
  return realNewState;
};

export const elementMap = {
  [ElementType.ASSET]: 'assets',
  [ElementType.NODE]: 'nodes',
  [ElementType.EDGE]: 'edges',
  [ElementType.SCENARIO]: 'scenarios',
  [ElementType.ANALYSIS]: 'requestedAnalysis',
};

export const getFirstLevelNodes =
  (globalNodeList: BaseNode[], hitNodeList: BaseNode[], globalEdgeList: Edge[]) => {
    let hitEdgeList: Edge[] = [];
    // per ogni nodo colpito, memorizzo gli archi colpiti
    hitNodeList.forEach((singleHitNode) => {
      const additionalHitEdgeList: Edge[] = globalEdgeList.filter((singleEdge: Edge) => {
        return singleEdge.node_from === singleHitNode.uuid;
      });
      hitEdgeList = [...hitEdgeList, ...additionalHitEdgeList];
    });
    let nodesToReturn: BaseNode[] = [];
    // memorizzo i nodi che sono un node_to di un arco colpito
    hitEdgeList.forEach((singleHitEdge) => {
      const additionalNodesToReturn: BaseNode[] = globalNodeList.filter((singleNode: BaseNode) => {
        return singleHitEdge.node_to === singleNode.uuid;
      });
      nodesToReturn = [...nodesToReturn, ...additionalNodesToReturn];
    });
    return nodesToReturn;
  };

export const calculateNodeDamage = (reddito: number) => {
  return 200000 - reddito;
};
