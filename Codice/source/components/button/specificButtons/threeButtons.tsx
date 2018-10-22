/*
 * Author: Giulia Petenazzi
 * File: source/components/button/specificButtons/threeButtons.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { ThreeButtonsOwnPropsInterface } from './threeButtonsInterface';
import { CardActions, CardText, RaisedButton } from 'material-ui';
import { ElementType, OperationType } from '../../../store/action/actionInterface';
// import DeleteForever from 'material-ui/svg-icons/action/delete';
// import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// import Undo from 'material-ui/svg-icons/content/undo';

export class ThreeButtons extends React.Component<ThreeButtonsOwnPropsInterface, null> {
  constructor(props: ThreeButtonsOwnPropsInterface) {
    super(props);
    this.onEditClickHook = this.onEditClickHook.bind(this);
    this.onDeleteClickHook = this.onDeleteClickHook.bind(this);
    this.onCancelClickHook = this.onCancelClickHook.bind(this);
  }

  public render() {
    return (
      <div>
        <CardActions style = {{ float: 'center' }}>
          <RaisedButton
            primary = {true}
            label = "Modifica"
            type = "submit"
            secondary = {true}
            onClick = {this.onEditClickHook}
            disabled = {this.props.sidebarType.elementType === ElementType.EDGE}
          />
          <RaisedButton
            primary = {true}
            label = "Elimina"
            secondary = {true}
            onClick = {this.onDeleteClickHook}
          />
          <RaisedButton
            primary = {true}
            label = "Annulla"
            secondary = {true}
            onClick = {this.onCancelClickHook}
          />
        </CardActions>
      </div>
    );
  }

  private onEditClickHook(event: any) {
    event.preventDefault();
    this.props.emitUpdateReactData({
      sidebarType: {
        operationType: OperationType.EDIT,
        elementType: this.props.sidebarType.elementType,
      },
    });
  }

  private onDeleteClickHook(event: any) {
    event.preventDefault();
    this.props.emitUpdateReactData({
      dialogVisibility: true,
    });
  }

  private onCancelClickHook(event: any) {
    event.preventDefault();
    this.props.emitUpdateReactData({
      sidebarType: {
        operationType: OperationType.VIEW,
        elementType: ElementType.SCENARIO,
      },
      selectedUuid: null,
    });
  }
}
