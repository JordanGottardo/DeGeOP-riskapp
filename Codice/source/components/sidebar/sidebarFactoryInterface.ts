/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/sidebarFactoryInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { StoreObject } from '../../store/types/storeObjects';
import { SidebarTypeInterface } from './sidebarTypeInterface';
import { AllValidationResultsType, CompiledDataInterface } from '../defaultState';
import { ActionCreatorInterface } from '../../store/action/actionInterface';

export type SidebarFactoryOwnPropsInterface = CompiledDataInterface & {
  sidebarType: SidebarTypeInterface;
  selectedUuid: string;
  validationResults: AllValidationResultsType;
  // callbacks
  handleChange: (key: string, value: any) => void;
  emitUpdateReactData: ActionCreatorInterface;
  emitElementAction: ActionCreatorInterface;

};
