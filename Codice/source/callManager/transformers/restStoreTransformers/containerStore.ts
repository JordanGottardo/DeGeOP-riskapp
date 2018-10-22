/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restStoreTransformers/containerStore.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { RestStoreTransform } from '../transformInterface';
import { OperationType, ElementType } from '../../../store/action/actionInterface';
import { Container } from '../../../store/types/container';
import RestContainer from '../restInterfaces/edge';

const containerStore: RestStoreTransform<RestContainer, Container> =
  (asset: RestContainer) => {
    const payload: any = {};
    return {
      payload,
      type: ElementType.EDGE,
      operation: OperationType.INSERT,
    };
  };

export default containerStore;
