/*
 * Author: Giulia Petenazzi
 * File: source/components/button/buttonFactoryInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { SidebarTypeInterface } from '../sidebar/sidebarTypeInterface';
import { ActionCreatorInterface } from '../../store/action/actionInterface';

export interface ButtonFactoryOwnPropsInterface {
  sidebarType: SidebarTypeInterface;
  emitUpdateReactData: ActionCreatorInterface;
  compiledDataIsValid: boolean;
  selectedUuid: string;
}
