/*
 * Author: Leonardo Brutesco
 * File: source/components/mapComponent/mapComponentInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { Asset } from '../../store/types/asset';
import { BaseNode } from '../../store/types/node';
import { Edge } from '../../store/types/edge';
import { Scenario } from '../../store/types/scenario';
import { SidebarTypeInterface } from '../sidebar/sidebarTypeInterface';
import { ActionCreatorInterface } from '../../store/action/actionInterface';

export interface MapComponentStateToPropsInterface {
  assets: Asset[];
  nodes: BaseNode[];
  edges: Edge[];
  scenarios: Scenario[];
  selectedUuid: string;
  centerTimestamp: number;
}

export interface MapComponentOwnPropsInterface {
  emitUpdateReactData: ActionCreatorInterface;
  handleChange: any;
  sidebarType: SidebarTypeInterface;
  /*
  coloredNodeList {
  "61becb6b-4d50-4877-873b-41b1b33c91a2" : #e91e63 ".
  "adac00d9-8308-4ff9-8d9d-013085037545": "#3f51b5 "
  }
   */
  coloredNodeList: any;
}

export interface MapComponentStateInterface {
  showPOWButton: boolean;
}

export type MapComponentPropsInterface =
MapComponentStateToPropsInterface & MapComponentOwnPropsInterface;
