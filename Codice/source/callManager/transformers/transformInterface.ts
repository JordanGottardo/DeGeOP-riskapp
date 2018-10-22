/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/transformInterface.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../../store/action/actionInterface';

type StoreRestTransform<ActionContent, RestObject> =
  (action: ActionInterface<ActionContent>) => RestObject;

type RestStoreTransform<RestObject, ActionContent> =
  (restContent: RestObject, type?: string) => ActionInterface<ActionContent>;

export { StoreRestTransform, RestStoreTransform };
