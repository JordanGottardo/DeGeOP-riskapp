/*
 * Author: Giulia Petenazzi
 * File: source/components/dropDown/dropDown.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { DropDownOwnPropsInterface } from './dropDownInterface';
import { MenuItem, SelectField } from 'material-ui';

export class DropDown extends React.Component<DropDownOwnPropsInterface, null> {
  constructor(props: DropDownOwnPropsInterface) {
    super(props);
    this.onChangeHook = this.onChangeHook.bind(this);
  }

  public render() {
    const { elements, handleChangeKey, handleChange, ...rest } = this.props;
    const menuItems = [];
    for (const elementKey in elements) {
      if (elements.hasOwnProperty(elementKey) && !isNaN(Number(elementKey))) {
        menuItems.push(
          <MenuItem
            value = {elementKey}
            primaryText = {elements[elementKey].replace(/_/g, ' ')}
            key = {elements[elementKey]}
          />,
        );
      }
    }
    return (
      <div>
        <SelectField
          {...rest}
          value = {this.props.value.toString()}
          onChange = {this.onChangeHook}
        >
          {menuItems}
        </SelectField>
      </div>
    );
  }

  private onChangeHook(event: any, index: any, value: string) {
    console.log(typeof value);
    this.props.handleChange(this.props.handleChangeKey, Number(value));
  }
}
