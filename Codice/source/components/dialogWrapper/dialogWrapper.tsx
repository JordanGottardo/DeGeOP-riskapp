/*
 * Author: Giulia Petenazzi
 * File: source/components/dialogWrapper/dialogWrapper.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { StoreInterface } from '../../store/types/storeInterface';
import {
  DialogWrapperOwnPropsInterface, DialogWrapperPropsInterface,
  DialogWrapperStateToPropsInterface,
} from './dialogWrapperInterface';
import * as React from 'react';
import { connect } from 'react-redux';
import { CardActions, Dialog, RaisedButton } from 'material-ui';
import { ElementType, OperationType } from '../../store/action/actionInterface';
import { elementNameMap } from '../../viewUtils/viewUtils';

const mapStateToDialogWrapperrops = (state: StoreInterface):
DialogWrapperStateToPropsInterface => ({
  dialogVisibility: state.reactData.dialogVisibility,
  sidebarType: state.reactData.sidebarType,
});

class DialogWrapper extends React.Component<DialogWrapperPropsInterface, null> {
  constructor(props: DialogWrapperPropsInterface) {
    super(props);
    this.onConfirmClickHook = this.onConfirmClickHook.bind(this);
    this.onCancelClickHook = this.onCancelClickHook.bind(this);
  }

  public render() {
    return (
      <div>
        <Dialog
          title = "Conferma operazione"
          open = {this.props.dialogVisibility}
        >
          <CardActions>
            <RaisedButton
              label = "Conferma eliminazione"
              onClick = {this.onConfirmClickHook}
              primary = {true}
            />
            <RaisedButton
              label = "Annulla eliminazione"
              onClick = {this.onCancelClickHook}
              primary = {true}
            />
          </CardActions>
        </Dialog>
      </div>
    );
  }

  private onConfirmClickHook(event: any) {
    const elementName = elementNameMap[this.props.sidebarType.elementType];
    this.props.emitElementAction();
    this.props.emitUpdateReactData({
      sidebarType: {
        operationType: OperationType.VIEW,
        elementType: ElementType.SCENARIO,
      },
      selectedUuid: null,
      dialogVisibility: false,
      snackbarMessage: elementName + ' eliminato con successo',
      snackbarDuration: '3000',
      snackbarVisibility: true,
    });
  }

  private onCancelClickHook(event: any) {
    this.props.emitUpdateReactData({
      dialogVisibility: false,
    });
  }
}

export default connect<DialogWrapperStateToPropsInterface, null, DialogWrapperOwnPropsInterface>
(mapStateToDialogWrapperrops, null)(DialogWrapper);
