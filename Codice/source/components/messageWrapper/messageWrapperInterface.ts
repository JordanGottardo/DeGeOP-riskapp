/*
 * Author: Jordan Gottardo
 * File: source/components/messageWrapper/messageWrapperInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface } from '../../store/action/actionInterface';
import { ReactDataOptionsInterface } from '../../store/types/reactDataOptionsInterface';
import { Container } from '../../store/types/container';
import { SidebarTypeInterface } from '../sidebar/sidebarTypeInterface';
import { BaseNode } from '../../store/types/node';
import { Asset } from '../../store/types/asset';

export interface MessageWrapperStateToPropsInterface {
  messageVisibility: boolean;
  message: string;
  containers: Container[];
  assets: Asset[];
  nodes: BaseNode[];
}

export interface MessageWrapperOwnPropsInterface {
  emitUpdateReactData: (obj: any) => void;
  globalEconomicResult: number;
  sidebarType: SidebarTypeInterface;
}

export type MessageWrapperPropsInterface = MessageWrapperStateToPropsInterface &
  MessageWrapperOwnPropsInterface;

export interface MessageWrapperStateInterface {
  legendaVisibility: boolean;
}
