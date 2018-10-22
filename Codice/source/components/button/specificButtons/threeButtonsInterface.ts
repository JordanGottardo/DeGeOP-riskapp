/*
 * Author: Giulia Petenazzi
 * File: source/components/button/specificButtons/threeButtonsInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface } from '../../../store/action/actionInterface';
import { SidebarTypeInterface } from '../../sidebar/sidebarTypeInterface';

export interface ThreeButtonsOwnPropsInterface {
  sidebarType: SidebarTypeInterface;
  emitUpdateReactData: ActionCreatorInterface;

}
