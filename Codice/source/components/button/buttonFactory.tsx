/*
 * Author: Giulia Petenazzi
 * File: source/components/button/buttonFactory.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { ButtonFactoryOwnPropsInterface } from './buttonFactoryInterface';
import { TwoButtons } from './specificButtons/twoButtons';
import { ThreeButtons } from './specificButtons/threeButtons';
import { ElementType, OperationType } from '../../store/action/actionInterface';

export class ButtonFactory extends React.Component<ButtonFactoryOwnPropsInterface, null> {

  public render() {
    const operationType = this.props.sidebarType.operationType;
    const elementType = this.props.sidebarType.elementType;
    const selectedUuid = this.props.selectedUuid;
    if (elementType === ElementType.ANALYSIS ||
      (elementType === ElementType.SCENARIO && operationType === OperationType.VIEW &&
      selectedUuid === null)) {
      return null;
    }

    let buttonsToRender = null;
    const propsToPass = {
      emitUpdateReactData: this.props.emitUpdateReactData,
      sidebarType: this.props.sidebarType,
    };
    if (operationType === OperationType.INSERT || operationType === OperationType.EDIT) {
      buttonsToRender =
        <TwoButtons compiledDataIsValid = {this.props.compiledDataIsValid} {...propsToPass}/>;
    } else {
      buttonsToRender = <ThreeButtons {...propsToPass} />;
    }
    return buttonsToRender;
  }
}
