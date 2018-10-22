/*
 * Author: Giulia Petenazzi
 * File: source/components/button/addButton.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { AddButtonOwnPropsInterface } from './addButtonInterface';
import { FloatingActionButton, FontIcon, IconButton, IconMenu, MenuItem } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { ElementType, OperationType } from '../../store/action/actionInterface';
import { SidebarElementType, SidebarOperationType } from '../sidebar/sidebarTypeInterface';

export class AddButton extends React.Component<AddButtonOwnPropsInterface, null> {
  constructor(props: AddButtonOwnPropsInterface) {
    super(props);
    this.onMenuItemClickHook = this.onMenuItemClickHook.bind(this);
  }

  public render() {
    if (this.props.operationType !== OperationType.VIEW) {
      return null;
    }

    return (
      <div>
        <IconMenu
          anchorOrigin = {{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin = {{ horizontal: 'right', vertical: 'bottom' }}
          iconButtonElement = {
            <IconButton>
              <FloatingActionButton>
                <ContentAdd />
              </FloatingActionButton>
            </IconButton>}
        >
          <MenuItem
            primaryText = "Aggiungi asset"
            onClick = {(e) => {this.onMenuItemClickHook(e, ElementType.ASSET);}}
          />
          <MenuItem
            primaryText = "Aggiungi nodo"
            onClick = {(e) => {this.onMenuItemClickHook(e, ElementType.NODE);}}
          />
          <MenuItem
            primaryText = "Aggiungi arco"
            onClick = {(e) => {this.onMenuItemClickHook(e, ElementType.EDGE);}}
          />
          <MenuItem
            primaryText = "Aggiungi scenario"
            onClick = {(e) => {this.onMenuItemClickHook(e, ElementType.SCENARIO);}}
          />
        </IconMenu>
      </div>
    );
  }

  private onMenuItemClickHook(event: any, elementType: SidebarElementType) {
    event.preventDefault();
    console.log('addButton' + ElementType[elementType]);
    this.props.emitUpdateReactData({
      sidebarType: {
        elementType,
        operationType: OperationType.INSERT,
      },
      selectedUuid: null,
    },
    );
  }
}
