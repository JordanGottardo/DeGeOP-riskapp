/*
 * Author: Giulia Petenazzi
 * File: source/components/dialogWrapper/dialogWrapperInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface } from '../../store/action/actionInterface';
import { SidebarTypeInterface } from '../sidebar/sidebarTypeInterface';

export interface DialogWrapperStateToPropsInterface {
  dialogVisibility: boolean;
  sidebarType: SidebarTypeInterface;
}

export interface DialogWrapperOwnPropsInterface {
  emitElementAction: () => void;
  emitUpdateReactData: ActionCreatorInterface;
}

export type DialogWrapperPropsInterface= DialogWrapperOwnPropsInterface &
DialogWrapperStateToPropsInterface;
