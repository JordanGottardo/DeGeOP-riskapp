/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/analysisSidebar.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import {
  AnalysisSidebarDispatchToPropsInterface,
  AnalysisSidebarStateInterface,
  AnalysisSidebarStateToPropsInterface, NotAnalyzedScenario,
  SpecificSidebarOwnPropsInterface,
} from './specificSidebarInterface';
import { StoreInterface } from '../../../store/types/storeInterface';
import { connect } from 'react-redux';
import {
  getNotAnalyzedScenarios, getScenarioFromUuid,
  mergeTwoAnalysisStates,
} from '../../../storeUtils/storeUtils';
import { Scenario } from '../../../store/types/scenario';
import {
  CardHeader, CardText, Checkbox, IconButton, LinearProgress, List,
  ListItem, Paper, RaisedButton, CardActions, Divider, Slider, MenuItem, SelectField,
} from 'material-ui';
import { startAnalysisActionCreator } from '../../../store/action/actionCreator';
import { containerStatusEnumToProgressValue } from '../../../viewUtils/viewUtils';
import getBottomRight = ol.extent.getBottomRight;
import { Container, ContainerStatus } from '../../../store/types/container';
import { ActionAutorenew, ActionDelete, AvPlayArrow } from 'material-ui/svg-icons';
import { ElementType, OperationType } from '../../../store/action/actionInterface';
import { fullWhite } from 'material-ui/styles/colors';
import { calculateGlobalResult } from '../../../store/analysisAlgorithm/calculateGlobalResult';

const mapStateToAnalysisSidebarProps = (state: StoreInterface) => ({
  scenarios: state.scenarios,
  containers: state.containers,
  requestedAnalysis: state.requestedAnalysis,
  yearToAnalyze: state.reactData.yearToAnalyze,
});

const mapDispatchToAnalysisSidebarProps: AnalysisSidebarDispatchToPropsInterface = {
  emitStartAnalysisAction: startAnalysisActionCreator,
};

class AnalysisSidebar extends React.Component<SpecificSidebarOwnPropsInterface,
  AnalysisSidebarStateInterface> {
  constructor(props: SpecificSidebarOwnPropsInterface) {
    super(props);
    this.state = this.buildState(props);
    console.log('AnalysisSidebar initialState = ' + JSON.stringify(this.state));
    this.onAnalysisCheckHook = this.onAnalysisCheckHook.bind(this);
    this.onAnalysisSubmitHook = this.onAnalysisSubmitHook.bind(this);
    this.onUpdateAnalysisClickHook = this.onUpdateAnalysisClickHook.bind(this);
    this.onDeleteAnalysisClickHook = this.onDeleteAnalysisClickHook.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.isScenarioChecked = this.isScenarioChecked.bind(this);
    this.getSelectedScenarioUuids = this.getSelectedScenarioUuids.bind(this);
    this.getScenarioMenuItems = this.getScenarioMenuItems.bind(this);
  }

  public componentWillReceiveProps(nextProps: SpecificSidebarOwnPropsInterface) {
    const newTempState = this.buildState(nextProps);
    const newState = mergeTwoAnalysisStates(this.state, newTempState);
    this.setState(newState);
  }

  public render() {
    const { scenarios, containers, requestedAnalysis } = this.props;
    const executedAnalysisItems = [];

    for (const container of containers) {
      const containerUuid = container.scenario;
      const scenario = getScenarioFromUuid(scenarios, containerUuid);
      const status = container.status;
      if (status === ContainerStatus.STATUS_ERROR || status === ContainerStatus.STATUS_NOT_VALID ||
        status === ContainerStatus.STATUS_TIMED_OUT) {
        this.props.emitUpdateReactData({
          snackbarMessage: 'Alcune analisi sono in errore. Prego rilanciare l\'analisi',
          snackbarDuration: 5000,
        });
        // cancella il container dallo store
        this.props.emitElementAction(container, {
          operationType: OperationType.VIEW,
          elementType: ElementType.CONTAINER,
        });
      } else {
        executedAnalysisItems.push(
          <div>
            <ListItem
              primaryText = {scenario.name}
              secondaryText = {status === ContainerStatus.STATUS_COMPLETED ? 'Completata' : ''}
              hoverColor = {'#FFFFFF'}
              leftIcon = {
                <IconButton
                  tooltip = "Aggiorna analisi"
                  onClick = {((e) => {this.onUpdateAnalysisClickHook(e, scenario);})}
                >
                  <ActionAutorenew color = "#B71C1C"/>
                </IconButton>
              }
              rightIcon = {
                <IconButton
                  tooltip = "Elimina analisi"
                  onClick = {((e) => {this.onDeleteAnalysisClickHook(e, container);})}
                >
                  <ActionDelete color = "#B71C1C" />
                </IconButton>
              }
              style = {{ maxWidth:'17em' }}
            />
            <LinearProgress
              mode = "determinate"
              style = {{ marginLeft: '5em', width: '8em', size: '8' }}
              value = {containerStatusEnumToProgressValue[container.status]}
              color = {status === ContainerStatus.STATUS_COMPLETED ? '#2E7D32' : '#616161'}
            />
          </div>,
        );
      }
    }
    const scenariosCheckboxes = [];
    for (const element of this.state.notAnalyzedScenarios) {
      const scenario = element.scenario;
      scenariosCheckboxes.push(
        <Checkbox
          label = {scenario.name}
          onCheck = {(event, isInputChecked) => {
            this.onAnalysisCheckHook(event, isInputChecked, scenario.uuid);
          }}
          checked = {element.toRequest}
        />,
      );
    }

    const scenarioMenuItems = this.getScenarioMenuItems();

    return (
      <div>
        <CardText>
        <p
          style = {{ marginBottom: '4', paddingBottom:'4',
            paddingTop: '4', marginTop: '4', color: '#B71C1C' }}
        >
          Scenari presenti nella corrente analisi
        </p>
          <Paper
            zDepth = {1}
            style = {{ height: '8em', overflowY: 'auto', overflowX: 'hidden' }}
          >
            <List>
              {executedAnalysisItems}
            </List>
          </Paper>
          <Divider
            style = {{ backgroundColor: 'rgb(183, 28, 28)', height: '1px',
              marginTop: '26' }}
          />
          <p
            style = {{ marginBottom: '4', paddingBottom:'4',
              paddingTop: '8', marginTop: '8', color: '#B71C1C' }}
          >
            Seleziona gli scenari da aggiungere e clicca su &quot;Avvia Analisi&quot;
          </p>
          <SelectField
            multiple = {true}
            hintText =  "Lista scenari da analizzare"
            value = {this.getSelectedScenarioUuids()}
            onChange = {this.onDropdownChange}
            fullWidth = {true}
            menuStyle = {{ marginBottom: '4', paddingBottom:'4' }}
          >
            {scenarioMenuItems}
          </SelectField>
          <p
            style = {{ marginBottom: '4', paddingBottom:'4',
              paddingTop: '8', marginTop: '8', color: '#B71C1C', display: 'inline', float: 'left'}}
          >
            Anno da analizzare: {this.props.yearToAnalyze}
          </p>
          <Slider
            min = {1}
            max = {3}
            step = {1}
            value = {this.props.yearToAnalyze}
            onChange = {this.onSliderChange}
            style = {{ width:'8em', display: 'inline',
              float: 'right', marginBottom: '0', paddingBottom:'0', height: '40'}}
            sliderStyle = {{ color: '#B71C1C' }}
          />
          <RaisedButton
            icon = {<AvPlayArrow color = {fullWhite} />}
            fullWidth = {true}
            label = "Avvia analisi"
            primary = {true}
            type = "submit"
            disabled = {this.calculateSendAnalysisDisabled()}
            onClick = {this.onAnalysisSubmitHook}
            style = {{ paddingTop: '0em', marginTop: '0' }}
          />
        </CardText>
      </div>
    );
  }

  private buildState(props: SpecificSidebarOwnPropsInterface) {
    const { scenarios, containers, requestedAnalysis } = props;
    const notAnalyzedScenarios = getNotAnalyzedScenarios(scenarios, containers, requestedAnalysis);
    let newState: NotAnalyzedScenario[] = [];
    for (const scenario of notAnalyzedScenarios) {
      newState = [...newState, {
        scenario,
        toRequest: false,
      }];
    }
    return {
      notAnalyzedScenarios: newState,
    };
  }

  private onAnalysisCheckHook(event: any, isInputChecked: boolean, scenarioUuid: string) {
    console.log('onCheck isInputChecked = ' + isInputChecked + typeof scenarioUuid + scenarioUuid);
    const notAnalizedScenarios = this.state.notAnalyzedScenarios;
    const newState = notAnalizedScenarios.map((notAnalyzedScenario: NotAnalyzedScenario) => {
      if (notAnalyzedScenario.scenario.uuid !== scenarioUuid) {
        return notAnalyzedScenario;
      }
      console.log('uuid scenari uguali, notAnalyzedScenario = ' +
        notAnalyzedScenario.scenario.uuid + ' uuid evento = ' + scenarioUuid);
      return { ...notAnalyzedScenario, toRequest: isInputChecked };
    });
    this.setState({
      notAnalyzedScenarios: newState,
    },            () => {console.log(this.state);});
  }

  private onAnalysisSubmitHook(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('AnalysisSidebar onSubmit');
    const notAnalyzedScenarios = this.state.notAnalyzedScenarios;
    console.log('state notAnalyzedScenarios = ' + JSON.stringify(notAnalyzedScenarios));
    // Ritorna solo i NotAnalyzedScenario che hanno toRequest == true
    const scenariosToAnalyze: NotAnalyzedScenario[] = notAnalyzedScenarios.filter(
      (notAnalyzedScenario: NotAnalyzedScenario) => {
        return notAnalyzedScenario.toRequest === true;
      },
    );
    console.log('ScenariosToAnalyze = ' + JSON.stringify(scenariosToAnalyze));
    const requestedAnalysis = scenariosToAnalyze.map(
      (scenarioToAnalyze: NotAnalyzedScenario) => {
        return scenarioToAnalyze.scenario.uuid;
      });

    this.props.emitStartAnalysisAction(requestedAnalysis);
    this.props.emitUpdateReactData({
      snackbarMessage: 'Analisi avviata',
      snackbarDuration: 3000,
      snackbarVisibility: true,
    });
  }

  // Ritorna false (quindi non disabilitare il bottone) sse è selezionata almeno un'analisi
  private calculateSendAnalysisDisabled() {
    const notAnalyzedScenarios = this.state.notAnalyzedScenarios;
    for (const notAnalyzedScenario of notAnalyzedScenarios) {
      if (notAnalyzedScenario.toRequest) {
        return false;
      }
    }
    return true;
  }

  private onUpdateAnalysisClickHook(event: any, scenario: Scenario) {
    this.props.emitStartAnalysisAction([scenario.uuid]);
    this.props.emitUpdateReactData({
      snackbarMessage: 'Analisi rilanciata con successo',
      snackbarDuration: '3000',
      snackbarVisibility: true,
    });
  }

  private onDeleteAnalysisClickHook(event: any, container: Container) {
    this.props.emitElementAction(container, {
      operationType: OperationType.VIEW,
      elementType: ElementType.CONTAINER,
    });
    this.props.emitUpdateReactData({
      snackbarMessage: 'Analisi eliminata con successo',
      snackbarDuration: '3000',
      snackbarVisibility: true,
    });
  }

  private onSliderChange(event: any, newValue: number) {
    this.props.emitUpdateReactData({
      yearToAnalyze: newValue,
    });
  }

  private getScenarioMenuItems() {
    const notAnalyzedScenarios = getNotAnalyzedScenarios(
      this.props.scenarios, this.props.containers, this.props.requestedAnalysis);
    return notAnalyzedScenarios.map((scenario: Scenario) => {
      console.log('mappo menuItems');
      return (
        <MenuItem
          key = {scenario.uuid}
          insetChildren = {true}
          checked = {this.isScenarioChecked(scenario.uuid)}
          value = {scenario.uuid}
          primaryText = {scenario.name}
        />
      );
    });
  }

  private isScenarioChecked(scenarioUuid: string): boolean {
    let isChecked: boolean;
    this.state.notAnalyzedScenarios.forEach((notAnalyzedScenario: NotAnalyzedScenario) => {
      if (notAnalyzedScenario.scenario.uuid === scenarioUuid) {
        isChecked = notAnalyzedScenario.toRequest;
      }
    });
    console.log('isScenarioChecked', scenarioUuid, ' ', isChecked);
    return isChecked;
  }

  private getSelectedScenarioUuids() {
    const selectedScenarios: string[] = [];
    this.state.notAnalyzedScenarios.forEach((notAnalyzedScenario: NotAnalyzedScenario) => {
      if (notAnalyzedScenario.toRequest) {
        selectedScenarios.push(notAnalyzedScenario.scenario.uuid);
      }
    });
    return selectedScenarios;
  }

  private onDropdownChange(event: object, key: number, payload: any) {
    console.log('dropdown', payload);
    const selectedScenarios: string[] = payload as string[];
    const newNotAnalyzedScenarios =
      this.state.notAnalyzedScenarios.map((notAnalyzedScenario: NotAnalyzedScenario) => {
        let isPresent: boolean = false;
        selectedScenarios.forEach((uuid: string) => {
          if (uuid === notAnalyzedScenario.scenario.uuid) {
            isPresent = true;
          }
        });
        return { ...notAnalyzedScenario, toRequest: isPresent };
      });
    this.setState({
      notAnalyzedScenarios: newNotAnalyzedScenarios,
    });
  }
}

export default connect<AnalysisSidebarStateToPropsInterface,
  any, SpecificSidebarOwnPropsInterface>
(mapStateToAnalysisSidebarProps, mapDispatchToAnalysisSidebarProps)(AnalysisSidebar);
