/*
 * Author: Jordan Gottardo
 * File: source/callManager/transformers/callManagerUtils/callManagerUtils.ts
 * Creation date: 2017-07-24
 * Last modified: 2017-08-22
 */
import { AssetOwner, AssetTypes } from '../../../store/types/asset';
import { NodeTypes } from '../../../store/types/node';
import { ScenarioType } from '../../../store/types/scenario';
import { EavValues } from '../restInterfaces/node';

export const assetTypeMap = {
  [AssetTypes.Mattoni]: '0010',
  [AssetTypes.Cemento_prefabbricato]: '0020',
  [AssetTypes.Acciaio]: '0030' ,
  [AssetTypes.Legno]:'0040' ,
  [AssetTypes.Struttura_costiera]: '0050',
};

export const assetBelongToMap = {
  [AssetOwner.Assicurando]: 'CUST',
  [AssetOwner.Cliente]: 'CLIE',
  [AssetOwner.Fornitore]: 'SUPP',
};

export const nodeClassMap = {
  [NodeTypes.Uscita]: '1',
  [NodeTypes.Macchina]: '2',
  [NodeTypes.Coda]: '3',
  [NodeTypes.Risorsa]: '4',
  [NodeTypes.Sorgente]: '5',
};

export const nodeShapeMap = {
  [NodeTypes.Uscita]: 'circle',
  [NodeTypes.Macchina]: 'square',
  [NodeTypes.Coda]: 'database',
  [NodeTypes.Risorsa]: 'dot',
  [NodeTypes.Sorgente]: 'triangleDown',
};

export const scenarioTypeMap = {
  [ScenarioType.Ciclone]: '7',
  [ScenarioType.Siccità]: '8',
  [ScenarioType.Terremoto]: '1',
  [ScenarioType.Incendio]: '2',
  [ScenarioType.Inondazione]: '3',
  [ScenarioType.Frana]: '6',
  [ScenarioType.Rottura_di_macchinari]: '4',
  [ScenarioType.Tornado]: '5',
  [ScenarioType.Eruzione_vulcanica]: '9',
};

export const findEavValue = (eavValues: EavValues[], slug: string) => {
  const eav: EavValues = eavValues.filter((eavValue: EavValues) => {
    return eavValue.slug === slug;
  })[0];
  if (eav && eav.slug === 'value') {
    return 200000;
  }
  return 1.0;
};

export const swapMap = (obj: any) => {
  const ret = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[obj[key]] = key;
    }
  }
  return ret;
};

export const rgb2hex = (r: number, g: number, b: number) => {
  // tslint:disable-next-line:no-bitwise
  const rgb = b | (g << 8) | (r << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
};

export const hex2rgb = (hex: string) => {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
    a: 100,
  };
};

export let customerUuid = ''; // da inserire qui,
