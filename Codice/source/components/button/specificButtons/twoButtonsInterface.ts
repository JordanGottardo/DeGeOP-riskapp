/*
 * Author: Giulia Petenazzi
 * File: source/components/button/specificButtons/twoButtonsInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { SidebarTypeInterface } from '../../sidebar/sidebarTypeInterface';

export interface TwoButtonsOwnPropsInterface {
  emitUpdateReactData: ActionCreatorInterface;
  compiledDataIsValid: boolean;
  sidebarType: SidebarTypeInterface;
}
