/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/restInterfaces/node.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
export interface EavValues {
  slug: string;
  value: string;
}

export interface RestNode {
  uuid: string;
  label: string;
  asset: string;
  node_class: string;
  color: string;
  shape: string;
  x: number;
  y: number;
  coordinate: string;
  eav_values: EavValues[];
}

export default RestNode;
