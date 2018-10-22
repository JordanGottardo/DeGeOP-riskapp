/*
 * Author: Giulia Petenazzi
 * File: source/store/analysisAlgorithm/calculateNodeColor.ts
 * Creation date: 2017-08-14
 * Last modified: 2017-08-22
 */
import {
  amber500, deepOrange500, green500, indigo500, lightGreen500,
  lime500, orange500, pink500, red500,yellow500,
} from 'material-ui/styles/colors';
import { NodeResultInterface } from '../types/container';

export const calculateNodeColor =
  (nodeEconomicResult: number) => {
    const n = nodeEconomicResult; // shortcut
    if (n >= 200000) {
      return indigo500;
    } else if (n >= 100000) {
      return green500;
    } else if (n >= 0) {
      return yellow500;
    } else if (n >= -100000) {
      return orange500;
    } else if (n >= -200000) {
      return red500;
    } else if (n < -200000) {
      return pink500;
    }
  };

export const calculateNodeColorList = (result: NodeResultInterface) => {
  const nodeColorList = {};
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      nodeColorList[key] = calculateNodeColor(result[key]);
    }
  }
  return nodeColorList;
};
