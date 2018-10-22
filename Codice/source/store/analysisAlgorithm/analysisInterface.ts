/*
 * Author: Giulia Petenazzi
 * File: source/store/analysisAlgorithm/analysisInterface.ts
 * Creation date: 2017-08-14
 * Last modified: 2017-08-22
 */
import { NodeTypes } from '../types/node';
import { AssetTypes } from '../types/asset';

export type calculateEconomicResultInterface =
  (nodeOrAsset: string, type: NodeTypes | AssetTypes,
   intensityMeasure: number, probabilityMeasure: number,
   eventTime: number, balanceTime: number, nodeDistance: number)
  => number;
