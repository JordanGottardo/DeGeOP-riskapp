/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/assetSidebar.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { SpecificSidebarOwnPropsInterface } from './specificSidebarInterface';
import { CardTitle, TextField, CardText, Paper } from 'material-ui';
import {
  OperationType,
  } from '../../../store/action/actionInterface';
import { Asset, AssetOwner, AssetTypes } from '../../../store/types/asset';
import { DropDown } from '../../dropDown/dropDown';
import { AssetValidationResultsInterface } from '../../defaultState';
import { Sketch } from '../../sketch/sketch';
import { assetSubtitles, operationTypeIta } from '../../../viewUtils/viewUtils';
import { CenterScreenButton } from '../../button/specificButtons/centerScreenButton';

export class AssetSidebar extends React.Component<SpecificSidebarOwnPropsInterface, null> {
  constructor(props: SpecificSidebarOwnPropsInterface) {
    super(props);
    this.onChangeHook = this.onChangeHook.bind(this);
    console.log(JSON.stringify(this.props));
  }

  public render() {
    const compiledData = this.props.compiledData as Asset;
    const operationType = this.props.operationType;

    const isViewSidebar = operationType === OperationType.VIEW;
    const sidebarTitle = operationTypeIta[operationType] + ' asset';
    const sidebarSubtitle = assetSubtitles[operationType];

    const validationResults = this.props.validationResults as AssetValidationResultsInterface;
    return (
      <div>
        <CardTitle
          title = {sidebarTitle}
          subtitle = {sidebarSubtitle}
          style = {{ width: '85%', display: 'inline', float: 'left' }}
        />
        <CenterScreenButton
          operationType = {operationType}
          emitUpdateReactData = {this.props.emitUpdateReactData}
        />
        <CardText>
          <Sketch
            color = {compiledData.color}
            handleChange = {this.props.handleChange}
            disabled = {isViewSidebar}
          />
          <Paper
            style = {{ height: '15em', overflowY: 'auto', overflowX: 'hidden',
              paddingLeft: '1em' }}
          >
            <TextField
              floatingLabelText = "Nome"
              value = {compiledData.name}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.name
              || validationResults.name === true) ? '' : 'Dato non valido'}
              onChange = {(event) => {this.onChangeHook(event, 'name');}}
            /><br/>
            <TextField
              floatingLabelText = "Descrizione"
              value = {compiledData.description}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.description
              || validationResults.description === true) ? '' : 'Dato non valido'}
              onChange = {(event) => {this.onChangeHook(event, 'description');}}
            /><br/>
             <DropDown
               disabled = {isViewSidebar}
               floatingLabelText = "Materiale"
               value = {compiledData.type.toString()}
               elements = {AssetTypes}
               handleChangeKey = "type"
               handleChange = {this.props.handleChange}
             />
             <DropDown
               disabled = {isViewSidebar}
               floatingLabelText = "Proprietario"
               value = {compiledData.belong_to.toString()}
               elements = {AssetOwner}
               handleChangeKey = "belong_to"
               handleChange = {this.props.handleChange}
             />
            <TextField
              type = "number"
              step = {.01}
              min = {0}
              floatingLabelText = "Superficie (mq)"
              value = {compiledData.surface}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.surface
              || validationResults.surface === true) ? '' : 'Dato non valido - es: 12,34'}
              onChange = {(event) => {this.onChangeHook(event, 'surface');}}
            /><br/>
            <TextField
              type = "number"
              step = {.01}
              min = {0}
              floatingLabelText = "Valore economico (€))"
              value = {compiledData.unitValue}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.unitValue
              || validationResults.unitValue === true) ? '' : 'Dato non valido - es: 12,34'}
              onChange = {(event) => {this.onChangeHook(event, 'unitValue');}}
            />
          </Paper>
        </CardText>
      </div>
    );
  }

  private onChangeHook(event: any, field: any) {
    console.log(typeof event.target.value + ' = ' + event.target.value);
    console.log('onChangeHook typeof event = ' + typeof event);
    this.props.handleChange(field, event.target.value);
  }
}
