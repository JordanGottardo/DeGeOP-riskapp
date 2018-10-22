/*
 * Author: Jordan Gottardo
 * File: source/components/degeopViewInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface,  ActionInterface } from '../store/action/actionInterface';
import { SidebarTypeInterface } from './sidebar/sidebarTypeInterface';
import { StoreObject } from '../store/types/storeObjects';
import { ReactDataOptionsInterface } from '../store/types/reactDataOptionsInterface';
import { Container } from '../store/types/container';
import { BaseNode } from '../store/types/node';
import { Asset } from '../store/types/asset';

// Le parentesi quadre indicano l'indicizzazione, ovvero che l'interfaccia accetta una lista di
// ActionCreatorInterface<any> indicizzata su una stringa. Per maggiori info guardare
// @types/react-redux/index.d.ts
export interface DegeopViewDispatchToPropsInterface {
  [name: string]: ActionCreatorInterface;
}

export interface DegeopViewStateToPropsInterface {
  sidebarType: SidebarTypeInterface;
  dialogVisibility: boolean;
  selectedUuid: string;
  internetAvailable: boolean;
  yearToAnalyze: number;
  containers: Container[];
  assets: Asset[];
  nodes: BaseNode[];
}

// Schema delle props che riceve la componente
export type DegeopViewPropsInterface = DegeopViewStateToPropsInterface &
  DegeopViewDispatchToPropsInterface;
