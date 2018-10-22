/*
 * Author: Giulia Petenazzi
 * File: source/store/analysisAlgorithm/calculateNodeAssetResult.ts
 * Creation date: 2017-08-14
 * Last modified: 2017-08-22
 */
import { calculateEconomicResultInterface } from './analysisInterface';
import { NodeTypes } from '../types/node';
import { AssetTypes } from '../types/asset';

  // PRE
  // nodeType: stringa esempio Macchina
  // assetType: stringa esempio Mattoni
  // intensity puo essere un numero da 0 a 100
  // probability puo essere un numero da 0 a 100
  // eventTime puo essere un numero intero tra 0 e 35
  // balanceTime puo essere o 12 o 24 o 36
  // nodeDistance puo essere:
    // 0 se il nodo è nell'area di uno scenario (o se siamo nel caso di un asset)
    // 1 a un livello di distanza da un nodo nell'area dello scenario
    // o 2 a 2 livelli di distanza da un nodo nell'area

  // POST
  // ritorna il risultato economico di quel nodo, compreso tra -200000 o + 200000 circa
  // oppure dell'asset, tra +500000 e -250 000

export const calculateNodeAssetResult: calculateEconomicResultInterface =
  (nodeOrAsset: string, type: NodeTypes | AssetTypes,
   intensityMeasure: number, probabilityMeasure: number,
   eventTime: number, balanceTime: number, nodeDistance: number) => {
    console.log('GIULY_ric: ' + nodeOrAsset, type,
                intensityMeasure, probabilityMeasure, eventTime, balanceTime, nodeDistance);
    let grossValue = 0;
    if (nodeOrAsset === 'NODE') {
      if (intensityMeasure === 0
        || probabilityMeasure === 0 || eventTime > balanceTime) {return 200000;}
      grossValue = setGrossNodeValue(type as NodeTypes, intensityMeasure, probabilityMeasure);
    } else if (nodeOrAsset === 'ASSET') {
      if (eventTime > balanceTime) {return 200000;}
      grossValue = setGrossAssetValue(type as AssetTypes, intensityMeasure, probabilityMeasure);
    }
    const timeDivider = setTimeDivider(eventTime, balanceTime, grossValue);
    const depthDivider = setDepthDivider(nodeDistance);
    const nodeEconomicResult = grossValue * timeDivider * depthDivider;
    console.log('GIULYr ' + nodeEconomicResult + ' DETT: ' + grossValue, timeDivider, depthDivider);
    return nodeEconomicResult;
  };

const setDepthDivider = (nodeDistance: number) => {
  switch (nodeDistance) {
    case(0):
      return 1;
    case(1):
      return 1 / 2;
    case(2):
      return 1 / 4;
  }
};

const setTimeDivider = (t: number, m: number, g: number) => {
  // t = eventTime, m = balanceTime, g = grossValue
  if ((m === 12 && t >= 0 && t <= 12)
    || (m === 24 && t > 12 && t <= 24)
    || (m === 36 && t > 24 && t <= 36)) {
    return (t % 12) / 12;
  } else if ((m === 24 && t >= 0 && t <= 12) || (m === 36 && t > 12 && t <= 24)) {
    return 1 + Math.abs(200000 - g) / (200000 * 4);
  } else if (m === 36 && t >= 0 && t <= 12) {
    return 1 + Math.abs(200000 - g) / (200000 * 1.5);
  } else {return 1;}  // non dovrebbe mai cadere in questo ramo del return 1

};

const setGrossNodeValue =
  (t: NodeTypes, i: number, p: number) => {
  // t = tipo di nodo, i = intensita, p = probabilità
    const c = 200000; // utile a regime
    let grossValue = c - (i / 100) * 0.9 * c - p * 0.11 * c / 2;
    if (i > 21 && p > 21) {
      if (t === NodeTypes.Macchina) {
        grossValue = grossValue - 50000 * (i / 100) * p;
      } else {
        grossValue = grossValue - 20000 * (i / 100) * p;
      }
    }
    return grossValue;
  };

const setGrossAssetValue =
  (t: AssetTypes, i: number, p: number) => {
    // t = materiale dell'asset, i = intensita, p = probabilità
    const c = 200000; // utile a regime, completamente immaginario
    return c - (300000 * (i / 100) * p);
  };
