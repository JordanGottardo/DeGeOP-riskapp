/*
 * Author: Giulia Petenazzi
 * File: source/store/analysisAlgorithm/calculateGlobalResult.ts
 * Creation date: 2017-08-14
 * Last modified: 2017-08-22
 */
import { Container, SingleYearResultInterface } from '../types/container';
import { getCompletedContainers, mergeAndAddTwoResultLists } from '../../storeUtils/storeUtils';
import { calculateNodeColorList } from './calculateNodeColor';
import { BaseNode } from '../types/node';
import { Asset } from '../types/asset';

export const calculateGlobalResult = (containers: Container[], assets: Asset[],
                                      nodes: BaseNode[], currentYear: number) => {
  const completedContainers: Container[] = getCompletedContainers(containers);
  if (completedContainers.length === 0) {
    return null;
  }
  console.log(completedContainers.length);
  let globalNodeList = null;
  let globalAssetList = null;
  let globalEconomicResult: number = 0;
  console.log('calculateGlobalResult', containers);
  for (const container of completedContainers) {
    const partialYearResult: SingleYearResultInterface = container.result[currentYear];
    const hitNodes = partialYearResult.nodes;
    const hitAssets = partialYearResult.assets;

    globalNodeList = mergeAndAddTwoResultLists(hitNodes, globalNodeList);
    globalAssetList = mergeAndAddTwoResultLists(hitAssets, globalAssetList);
  }

  for (const key in globalNodeList) {
    if (globalNodeList.hasOwnProperty(key)) {
      globalEconomicResult = globalEconomicResult + globalNodeList[key];
    }
  }

  for (const key in globalAssetList) {
    if (globalAssetList.hasOwnProperty(key)) {
      globalEconomicResult = globalEconomicResult + globalAssetList[key];
    }
  }
  globalEconomicResult = globalEconomicResult +
    ((assets.length - Object.keys(globalAssetList).length) * 500000) +
    ((nodes.length - Object.keys(globalNodeList).length) * 200000);
  const coloredNodeList = calculateNodeColorList(globalNodeList);
  console.log('globalEconomicResult', globalEconomicResult, coloredNodeList);
  return {
    globalEconomicResult,
    coloredNodeList,
  };
};

const calculateObjectKeys = (obj: any) => {
  let counter = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      counter++;
    }
  }
  return counter;
};
