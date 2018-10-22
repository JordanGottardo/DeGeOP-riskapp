/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/storeRestMapper.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface, ElementType } from '../../store/action/actionInterface';
import { StoreRestTransform } from './transformInterface';
import {
  assetRest,
  containerRest,
  edgeRest,
  nodeRest,
  scenarioRest } from './storeRestTransformers/storeRestInterface';

const storeRestMapper: StoreRestTransform<any, any> = (action: ActionInterface<any>) => {
  switch (action.type) {
    case ElementType.ASSET:
      return assetRest(action);
    case ElementType.CONTAINER:
      return containerRest(action);
    case ElementType.EDGE:
      return edgeRest(action);
    case ElementType.NODE:
      return nodeRest(action);
    case ElementType.SCENARIO:
      return scenarioRest(action);
  }
};

export default storeRestMapper;
