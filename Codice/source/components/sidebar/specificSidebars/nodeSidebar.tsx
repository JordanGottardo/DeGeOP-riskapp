/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/nodeSidebar.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { SpecificSidebarOwnPropsInterface } from './specificSidebarInterface';
import { AllNodeTypes, Machine, Node, NodeTypes, Queue, Source } from '../../../store/types/node';
import { DropDown } from '../../dropDown/dropDown';
import { NodeValidationResultsInterface } from '../../defaultState';
import {
  OperationType,
  } from '../../../store/action/actionInterface';
import { CardText, CardTitle, TextField, Paper } from 'material-ui';
import { nodeSubtitles, operationTypeIta } from '../../../viewUtils/viewUtils';
import { CenterScreenButton } from '../../button/specificButtons/centerScreenButton';

export class NodeSidebar extends React.Component<SpecificSidebarOwnPropsInterface, null> {
  constructor(props: SpecificSidebarOwnPropsInterface) {
    super(props);
    this.onNodeTypeChangeHook = this.onNodeTypeChangeHook.bind(this);
  }

  public render() {
    const nodeData = this.props.compiledData as AllNodeTypes;
    const operationType = this.props.operationType;
    const isViewSidebar = operationType === OperationType.VIEW;
    const validationResults = this.props.validationResults as NodeValidationResultsInterface;
    const sidebarTitle = operationTypeIta[operationType] + ' nodo';
    const sidebarSubtitle = nodeSubtitles[operationType];

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
          <Paper
            style = {{ height: '17em', overflowY: 'auto', overflowX: 'hidden',
              paddingLeft: '1em', clear: 'both' }}
          >
            <DropDown
              floatingLabelText = "Tipo di nodo"
              value = {nodeData.node_class.toString()}
              disabled = {isViewSidebar}
              elements = {NodeTypes}
              handleChangeKey = "node_class"
              handleChange = {this.props.handleChange}
            />
            <TextField
              floatingLabelText = "Nome"
              value = {nodeData.label}
              disabled = {isViewSidebar}
              errorText = {(!nodeData.label
                || validationResults.label === true) ? '' : 'Dato non valido - es: 12,34'}
              onChange = {(event) => {this.onChangeHook(event, 'label');}}
            /><br/>
            {this.specializedFields(nodeData, isViewSidebar)}
          </Paper>
        </CardText>
      </div>
    );
  }

  private specializedFields(nodeData: AllNodeTypes, isViewSidebar: boolean) {
    let addedFields = null;
    let specificData = null;
    switch (nodeData.node_class) {
      case NodeTypes.Macchina:
        specificData = nodeData as Node<Machine>;
        addedFields = (
          <div>
            <TextField
              type = "number"
              floatingLabelText = "Capacità (unità)"
              step = {.01}
              min = {0}
              value = {specificData.capacity}
              disabled = {isViewSidebar}
              onChange = {(event) => {this.onChangeHook(event, 'capacity');}}
            /><br />
            <TextField
              type = "number"
              floatingLabelText = "Tempo di processo (unità)"
              value = {specificData.processingTime}
              step = {.01}
              min = {0}
              disabled = {isViewSidebar}
              onChange = {(event) => {this.onChangeHook(event, 'processingTime');}}
            /><br />
            <TextField
              type = "number"
              floatingLabelText = "Valore (€)"
              step = {.01}
              min = {0}
              value = {specificData.value}
              disabled = {isViewSidebar}
              onChange = {(event) => {this.onChangeHook(event, 'value');}}
            /><br />
          </div>
        );
        break;

      case NodeTypes.Coda:
        specificData = nodeData as Node<Queue>;
        addedFields = (
          <div>
            <TextField
              type = "number"
              floatingLabelText = "Capacità (unità)"
              step = {.01}
              min = {0}
              value = {specificData.capacity}
              disabled = {isViewSidebar}
              onChange = {(event) => {this.onChangeHook(event, 'capacity');}}
            /><br />
          </div>
        );
        break;

      case NodeTypes.Sorgente:
        specificData = nodeData as Node<Source>;
        addedFields = (
          <div>
            <TextField
              step = {.01}
              min = {0}
              type = "number"
              floatingLabelText = "Tempo di consegna (unità)"
              value = {specificData.leadTime}
              disabled = {isViewSidebar}
              onChange = {(event) => {this.onChangeHook(event, 'leadTime');}}
            /><br />
          </div>
        );
        break;
    }

    return addedFields;
  }

  private onNodeTypeChangeHook(event: any, index: any, value: string) {
    console.log(typeof value);
    this.props.handleChange('node_class', Number(value));
  }

  private onChangeHook(event: any, field: any) {
    console.log(event.target.value);
    console.log('onChangeHook typeof event = ' + typeof event);
    this.props.handleChange(field, event.target.value);
  }
}
