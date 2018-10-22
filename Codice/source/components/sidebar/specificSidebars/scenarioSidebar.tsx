/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/scenarioSidebar.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import {
  ScenarioSidebarStateToPropsInterface,
  SpecificSidebarOwnPropsInterface,
} from './specificSidebarInterface';
import { ElementType, OperationType } from '../../../store/action/actionInterface';
import {
  CardTitle, MenuItem, SelectField, TextField, CardText, Paper,
  CardHeader, Divider,
} from 'material-ui';
import { StoreInterface } from '../../../store/types/storeInterface';
import { connect } from 'react-redux';
import { Scenario, ScenarioType } from '../../../store/types/scenario';
import { generateNewUUID } from '../../../store/types/uuid';
import { ScenarioValidationResultsInterface } from '../../defaultState';
import { DropDown } from '../../dropDown/dropDown';
import { CenterScreenButton } from '../../button/specificButtons/centerScreenButton';

const mapStateToScenarioSidebarProps = (state: StoreInterface) => ({
  scenarios: state.scenarios,
});
// TODO da fixare il connect che va tolto
class ScenarioSidebar extends React.Component<SpecificSidebarOwnPropsInterface, null> {
  constructor(props: SpecificSidebarOwnPropsInterface) {
    super(props);
    this.onScenarioChangeHook = this.onScenarioChangeHook.bind(this);
    this.onChangeHook = this.onChangeHook.bind(this);
    console.log('scenarioSidebar constructor selectedUuid = ' + this.props.selectedUuid);
  }

  public render() {
    const { operationType } = this.props;
    const compiledData = this.props.compiledData as Scenario;
    const validationResults = this.props.validationResults as ScenarioValidationResultsInterface;
    const isViewSidebar = this.props.operationType === OperationType.VIEW;
    const elementsToRender = [];
    const selectedUuid = this.props.selectedUuid;
    console.log('render scenarioSidebar operationType = ' + OperationType[operationType] +
      ' selectedUuid = ' + selectedUuid);

    if (isViewSidebar) {
      console.log('ScenarioSidebar isViewSidebar scenario_type = ' + compiledData.scenario_type);
      const scenarioMenuItems = this.getScenariosMenuItems();
      elementsToRender.push (
        <div>
          <CardText>
            <SelectField
              floatingLabelText = "Scegli uno scenario"
              floatingLabelFixed = {true}
              value = {selectedUuid}
              onChange = {this.onScenarioChangeHook}
              key = {generateNewUUID()}
              fullWidth = {true}
              style = {{ margin: '1', padding: '0' }}
            >
              {scenarioMenuItems}
            </SelectField>
          <Divider
            style = {{ backgroundColor: 'rgb(183, 28, 28)', height: '1px',
              marginTop: '8' }}
          />
          </CardText>
        </div>,
      );
    }

    if (selectedUuid !== null || operationType !== OperationType.VIEW) {
      elementsToRender.push(
        <div>
        <CardTitle
          style = {
            this.props.operationType === OperationType.EDIT ?
              { width: '80%', display: 'inline', float: 'left' } :
              this.props.operationType === OperationType.INSERT ?
                { width: '80%', display: 'inline', float: 'left' } :
                { width: '80%', display: 'inline', float: 'left' } }
          title = {this.props.operationType === OperationType.EDIT ? 'Modifica scenario' :
            this.props.operationType === OperationType.INSERT ? 'Inserimento scenario' :
              'Dettagli scenario' }
        />
          <CenterScreenButton
            operationType = {this.props.operationType}
            emitUpdateReactData = {this.props.emitUpdateReactData}
          />
          <CardText>
            <Paper
              zDepth = {1}
              style = {
                this.props.operationType === OperationType.EDIT ?
                  { height: '17em', overflow: 'auto', padding: '8', margin: '0', clear: 'both' } :
                this.props.operationType === OperationType.INSERT ?
                  { height: '17em', overflow: 'auto', padding: '8', margin: '0', clear: 'both'  } :
                  { height: '9em', overflow: 'auto', padding: '8', margin: '0', clear: 'both'  } }
            >
            <TextField
              floatingLabelText = "Nome"
              value = {compiledData.name}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.name
                || validationResults.name === true) ? '' : 'Dato non valido'}
              onChange = {(event) => {
                this.onChangeHook(event, 'name');
              }}
            />
            <TextField
              floatingLabelText = "Descrizione"
              value = {compiledData.description}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.description
                || validationResults.description === true) ? '' : 'Dato non valido'}
              onChange = {(event) => {
                this.onChangeHook(event, 'description');
              }}
            />
            <DropDown
              floatingLabelFixed = {true}
              floatingLabelText = "Evento"
              value = {compiledData.scenario_type}
              elements = {ScenarioType}
              handleChangeKey = "scenario_type"
              handleChange = {this.props.handleChange}
              disabled = {isViewSidebar}
            />
            <TextField
              floatingLabelText = "Intensità (1-100)"
              type = "number"
              step = {1}
              min = {0}
              max = {100}
              value = {compiledData.intensity_measure}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.intensity_measure
                || validationResults.intensity_measure === true) ? '' : 'Dato non valido'}
              onChange = {(event) => {
                this.onChangeHook(event, 'intensity_measure');
              }}
            /> <br/>
            <TextField
              floatingLabelText = "Probabilità (0-1)"
              type = "number"
              step = {.01}
              min = {0}
              value = {compiledData.p_s}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.p_s
                || validationResults.p_s === true) ? '' : 'Dato non valido - es: 0,05'}
              onChange = {(event) => {
                this.onChangeHook(event, 'p_s');
              }}
            /> <br/>
            <TextField
              type = "number"
              step = {1}
              min = {0}
              max = {36}
              floatingLabelText = "Mese inizio evento (0-36)"
              value = {compiledData.event_time}
              disabled = {isViewSidebar}
              errorText = {(!compiledData.event_time
                || validationResults.event_time === true) ? '' : 'Dato non valido'}
              onChange = {(event) => {
                this.onChangeHook(event, 'event_time');
              }}
            />
            </Paper>
          </CardText>
        </div>,
      );
    }
    return (
      <div>
        {elementsToRender}
      </div>
    );
  }

  private getScenariosMenuItems() {
    const scenarios = this.props.scenarios;
    const menuItems =  scenarios.map((scenario: Scenario) => {
      console.log('ScenarioSidebar getScenarioMenuItems : ' + JSON.stringify(scenario));
      return (
        <MenuItem
          value = {scenario.uuid}
          primaryText = {scenario.name}
          key = {scenario.uuid}
        />);
    });
    const firstItem =  <MenuItem value = {null} primaryText = "Nessuno scenario selezionato" />;
    return [firstItem, ...menuItems];
  }

  private onScenarioChangeHook(event: any, index: any, value: any) {
    console.log('onScenarioChangeHook uuid = ' + event.target.value +
      ' index = ' + index + ' value = ' + value);
    this.props.emitUpdateReactData({
      selectedUuid: value,
    });
  }

  private onChangeHook(event: any, field: any) {
    console.log(event.target.value);
    this.props.handleChange(field, event.target.value);
  }

}

export default connect<ScenarioSidebarStateToPropsInterface, any, SpecificSidebarOwnPropsInterface>
(mapStateToScenarioSidebarProps, null)(ScenarioSidebar);
