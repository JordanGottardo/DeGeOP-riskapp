/*
 * Author: Marco Pasqualini
 * File: source/callManager/transformers/storeRestTransformers/containerRest.ts
 * Creation date: 2017-07-26
 * Last modified: 2017-08-22
 */
import { ActionInterface } from '../../../store/action/actionInterface';
import { StoreRestTransform } from '../transformInterface';
import { Container } from '../../../store/types/container';
import RestContainer from '../restInterfaces/container';

const containerRest: StoreRestTransform<Container, RestContainer> =
  (action: ActionInterface<Container>) => {
    return {};
  };

export default containerRest;
