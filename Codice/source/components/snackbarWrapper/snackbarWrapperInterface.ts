/*
 * Author: Jordan Gottardo
 * File: source/components/snackbarWrapper/snackbarWrapperInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ActionCreatorInterface } from '../../store/action/actionInterface';

export interface SnackbarWrapperStateInterface {
  open: boolean;
}

export interface SnackbarWrapperStateToPropsInterface {
  snackbarMessage: string;
  snackbarDuration: number;
  snackbarVisibility: boolean;
}

export interface SnackbarWrapperOwnPropsInterface {
  emitUpdateReactData: ActionCreatorInterface;
}

export type SnackbarWrapperPropsInterface = SnackbarWrapperStateToPropsInterface &
  SnackbarWrapperOwnPropsInterface;
