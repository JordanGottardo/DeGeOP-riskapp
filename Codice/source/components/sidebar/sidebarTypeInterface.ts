/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/sidebarTypeInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ElementType, OperationType,
  ActionTypeInterface } from '../../store/action/actionInterface';

export type SidebarElementType = ElementType.ANALYSIS | ElementType.ASSET |
ElementType.EDGE | ElementType.NODE | ElementType.SCENARIO;

export type SidebarOperationType = OperationType.EDIT | OperationType.INSERT | OperationType.VIEW;

export interface SidebarTypeInterface extends ActionTypeInterface {
  operationType: SidebarOperationType;
  elementType: SidebarElementType;
}
