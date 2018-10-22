/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restInterfaces/asset.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
interface RestAsset {
  uuid: string;
  type: string;
  surface: number;
  belong_to: string;
  customer: string;
  color: string;
  name: string;
  geoshape: string;
  description: string;
  value_of_the_asset: number;
}

export default RestAsset;
