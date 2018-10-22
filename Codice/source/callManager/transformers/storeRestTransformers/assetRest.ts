/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/storeRestTransformers/assetRest.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../../../store/action/actionInterface';
import { StoreRestTransform } from '../transformInterface';
import { Asset } from '../../../store/types/asset';
import RestAsset from '../restInterfaces/asset';
import {
  assetBelongToMap, assetTypeMap, customerUuid,
  rgb2hex,
} from '../callManagerUtils/callManagerUtils';

const assetRest: StoreRestTransform<Asset, RestAsset> =
  (action: ActionInterface<Asset>) => {
    const color = action.payload.color;
    // const rgbaColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';
    const correctColor = rgb2hex(color.r, color.g, color.b);
    return {
      uuid: action.payload.uuid,
      type: assetTypeMap[action.payload.type],
      surface: action.payload.surface,
      belong_to: assetBelongToMap[action.payload.belong_to],
      customer: customerUuid,
      color: correctColor.toString(),
      name: action.payload.name,
      geoshape: action.payload.geoshape,
      description: action.payload.description,
      value_of_the_asset: action.payload.unitValue,
    };
  };

export default assetRest;
