/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restStoreTransformers/assetStore.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface, OperationType, ElementType } from '../../../store/action/actionInterface';
import { RestStoreTransform } from '../transformInterface';
import { Asset } from '../../../store/types/asset';
import RestAsset from '../restInterfaces/asset';
import {
  assetBelongToMap, assetTypeMap, hex2rgb,
  swapMap,
} from '../callManagerUtils/callManagerUtils';

const assetStore: RestStoreTransform<RestAsset, Asset> =
  (asset: RestAsset) => {
    const payload: Asset = {
      uuid: asset.uuid,
      name: asset.name,
      type: Number(swapMap(assetTypeMap)[asset.type]),
      belong_to: Number(swapMap(assetBelongToMap)[asset.belong_to]),
      surface: Number(asset.surface),
      unitValue: Number(asset.value_of_the_asset),
      color: hex2rgb(asset.color),
      description: asset.description,
      geoshape: asset.geoshape,
    };
    return {
      payload,
      type: ElementType.ASSET,
      operation: OperationType.INSERT,
    };
  };

export default assetStore;
