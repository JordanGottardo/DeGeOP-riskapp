/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restStoreMapper.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface, ElementType } from '../../store/action/actionInterface';
import { RestStoreTransform } from './transformInterface';
import {
  assetStore,
  containerStore,
  edgeStore,
  nodeStore,
  scenarioStore } from './restStoreTransformers/restStoreInterface';

const restStoreMapper: RestStoreTransform<any, any> = (rest: any, type: string) => {
  if (type === 'asset') {
    return assetStore(rest);
  } else if (type === 'node') {
    return nodeStore(rest);
  } else if (type === 'edge') {
    return edgeStore(rest);
  } else if (type === 'scenario') {
    return scenarioStore(rest);
  }
};

export default restStoreMapper;
