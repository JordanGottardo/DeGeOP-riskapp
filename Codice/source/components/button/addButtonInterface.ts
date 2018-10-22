/*
 * Author: Giulia Petenazzi
 * File: source/components/button/addButtonInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface } from '../../store/action/actionInterface';
import { SidebarOperationType } from '../sidebar/sidebarTypeInterface';

export interface AddButtonOwnPropsInterface {
  operationType: SidebarOperationType;
  emitUpdateReactData: ActionCreatorInterface;
}
