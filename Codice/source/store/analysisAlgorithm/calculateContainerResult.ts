/*
 * Author: Giulia Petenazzi
 * File: source/store/analysisAlgorithm/calculateContainerResult.ts
 * Creation date: 2017-08-14
 * Last modified: 2017-08-22
 */
import { Scenario } from '../types/scenario';
import { BaseNode } from '../types/node';
import { getFirstLevelNodes, calculateNodeDamage } from '../../storeUtils/storeUtils';
import { calculateNodeAssetResult } from './calculateNodeAssetResult';
import { getEnclosedNodes } from '../../components/mapComponent/mapUtils/mapUtils';
import { Edge } from '../types/edge';
import { Asset } from '../types/asset';
import singleClick = ol.events.condition.singleClick;

export const calculateSingleYearResult =
  (hitNodeList: BaseNode[], globalNodeList: BaseNode[], edgeList: Edge[],
   scenario: Scenario, balanceTime: number) => {
    const firstLevelNodesList = getFirstLevelNodes(globalNodeList, hitNodeList, edgeList);
    const secondLevelNodesList = getFirstLevelNodes(globalNodeList, firstLevelNodesList, edgeList);
    const valuedNodeList = {};
    const valuedAssetList = {};

    hitNodeList.forEach(
    (singleNode) => {
      const thisNodeEconomicResult = calculateNodeAssetResult(
        'NODE', singleNode.node_class, scenario.intensity_measure, scenario.p_s,
        scenario.event_time, balanceTime, 0,
      );
      if (valuedNodeList[singleNode.uuid] === undefined) {
        valuedNodeList[singleNode.uuid] = thisNodeEconomicResult;
      } else {
        valuedNodeList[singleNode.uuid] -= calculateNodeDamage(thisNodeEconomicResult) / 4;
      }
    },
  );
    firstLevelNodesList.forEach(
      (singleNode: BaseNode) => {
        const thisNodeEconomicResult = calculateNodeAssetResult(
          'NODE', singleNode.node_class, scenario.intensity_measure, scenario.p_s,
          scenario.event_time, balanceTime, 1,
        );
        if (valuedNodeList[singleNode.uuid] === undefined) {
          valuedNodeList[singleNode.uuid] = thisNodeEconomicResult;
        } else {
          valuedNodeList[singleNode.uuid] -= calculateNodeDamage(thisNodeEconomicResult) / 4;
        }
      },
    );
    secondLevelNodesList.forEach(
      (singleNode: BaseNode) => {
        const thisNodeEconomicResult = calculateNodeAssetResult(
          'NODE', singleNode.node_class, scenario.intensity_measure, scenario.p_s,
          scenario.event_time, balanceTime, 2,
        );
        if (valuedNodeList[singleNode.uuid] === undefined) {
          valuedNodeList[singleNode.uuid] = thisNodeEconomicResult;
        } else {
          valuedNodeList[singleNode.uuid] -= calculateNodeDamage(thisNodeEconomicResult) / 4;
        }
      },
    );
    // TODO sistemare questa ripetizione di codice
  /*
   const hitAssetList = {};
   hitNodeList.forEach(
      (singleNode) => {
        if (hitAssetList[singleNode.asset] === undefined) {
          const thisAssetEconomicResult = calculateNodeAssetResult(
            'ASSET', null, scenario.intensity_measure, scenario.p_s,
            scenario.event_time, balanceTime, 2,
          );
          hitAssetList[singleNode.asset] = thisAssetEconomicResult;
        }
      },
    );
*/
    hitNodeList.forEach(
      (singleNode) => {
        if (valuedAssetList[singleNode.asset] === undefined) {
          valuedAssetList[singleNode.asset] = calculateNodeAssetResult(
            'ASSET', null, scenario.intensity_measure, scenario.p_s,
            scenario.event_time, balanceTime, 0);
        }
      },
    );

    return {
      nodes: valuedNodeList,
      assets: valuedAssetList,
    };
  };

export const calculateContainerResult =
(globalNodeList: BaseNode[], edgeList: Edge[], scenario: Scenario) => {

  const containerResult: any = {};
  const hitNodeList = getEnclosedNodes(scenario, globalNodeList);
  console.log('calculateContainerResult hitNodeList');
  console.log(hitNodeList);
  for (let i = 1; i < 4; i++) {
    containerResult[i] =
      calculateSingleYearResult(hitNodeList, globalNodeList, edgeList, scenario, i * 12);
    console.log('calculateContainerResult dentro for, anno ' + i);
    console.log(containerResult[i]);
  }

  return {
    result: containerResult,
  };
};
