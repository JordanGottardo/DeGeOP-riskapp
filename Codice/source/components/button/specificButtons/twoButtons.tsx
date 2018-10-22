/*
 * Author: Giulia Petenazzi
 * File: source/components/button/specificButtons/twoButtons.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { TwoButtonsOwnPropsInterface } from './twoButtonsInterface';
import { RaisedButton, CardActions, FlatButton, CardText } from 'material-ui';
import { ElementType, OperationType } from '../../../store/action/actionInterface';
import { SidebarElementType, SidebarOperationType } from '../../sidebar/sidebarTypeInterface';
import { ReactDataOptionsInterface } from '../../../store/types/reactDataOptionsInterface';
import Undo from 'material-ui/svg-icons/content/undo';
import Save from 'material-ui/svg-icons/content/save';

export class TwoButtons extends React.Component<TwoButtonsOwnPropsInterface, null> {
  constructor(props: TwoButtonsOwnPropsInterface) {
    super(props);
    console.log('TwoButtons costruttore');
    this.onCancelClickHook = this.onCancelClickHook.bind((this));
  }

  public render() {
    return (
      <div>
        <CardActions>
          <RaisedButton
            primary = {true}
            label = "Salva"
            icon = {<Save />}
            type = "submit"
            disabled = {!this.props.compiledDataIsValid}
          />
          <RaisedButton
            primary = {true}
            label = "Annulla"
            icon = {<Undo />}
            onClick = {this.onCancelClickHook}
          />
        </CardActions>
      </div>
    );
  }

  // TODO da testare
  private onCancelClickHook(event: any) {
    event.preventDefault();
    const { operationType, elementType } = this.props.sidebarType;
    const nextOperationType: SidebarOperationType = OperationType.VIEW;
    const nextElementType: SidebarElementType =
      operationType === OperationType.EDIT ? elementType : ElementType.SCENARIO;
    const nextReactDataObject: ReactDataOptionsInterface  = {
      sidebarType: {
        operationType: nextOperationType,
        elementType: nextElementType,
      },
    };
    if (nextOperationType === OperationType.VIEW && nextElementType === ElementType.SCENARIO) {
      nextReactDataObject['selectedUuid'] = null;
    }

    // if (nextOperationType === OperationType.VIEW && nextElementType === ElementType.SCENARIO) {
    //   nextReactDataObject['selectedUuid'] = null;
    // }

    this.props.emitUpdateReactData(nextReactDataObject);
  }
}
