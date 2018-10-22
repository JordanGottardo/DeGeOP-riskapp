/*
 * Author: Jordan Gottardo
 * File: source/components/degeopView.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { storeObjectActionCreator } from '../store/action/actionCreator';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  CompiledDataInterface, defaultCompiledDatas, defaultState, defaultTrueValidationResults,
  nodeTypeDataMap,
  specificNodeValidationResultsMap,
  StateInterface,
} from './defaultState';
import {
  DegeopViewDispatchToPropsInterface,
  DegeopViewStateToPropsInterface,
  DegeopViewPropsInterface,
} from './degeopViewInterface';
import { StoreInterface } from '../store/types/storeInterface';
import { SidebarTypeInterface } from './sidebar/sidebarTypeInterface';
import { ActionCreatorInterface, ElementType,
  OperationType } from '../store/action/actionInterface';
import { AllElementsInterface, StoreObject } from '../store/types/storeObjects';
import { updateReactData } from '../store/action/reactDataAction';
// import { actionMap } from '../store/action/actionMap';

import * as connectedMap from './mapComponent/mapComponent';
import * as connectedMessageWrapper from './messageWrapper/messageWrapper';
import * as connectedDialogWrapper from './dialogWrapper/dialogWrapper';
import * as connectedSnackbarWrapper from './snackbarWrapper/snackbarWrapper';
import { SidebarFactory } from './sidebar/sidebarFactory';
import { ButtonFactory } from './button/buttonFactory';
import { AddButton } from './button/addButton';
import { validationPatternsMap } from '../validationUtils/validationUtils';
import { generateNewUUID } from '../store/types/uuid';
import { AllNodeTypes, BaseNode, Node, NodeTypes, Source } from '../store/types/node';
import { Drawer, Paper } from 'material-ui';
import { elementMap } from '../storeUtils/storeUtils';
import { elementNameMap } from '../viewUtils/viewUtils';
import { calculateGlobalResult } from '../store/analysisAlgorithm/calculateGlobalResult';
import { Container } from '../store/types/container';

const mapStateToDegeopViewProps = (state: StoreInterface):
DegeopViewStateToPropsInterface => ({
  sidebarType: state.reactData.sidebarType,
  dialogVisibility: state.reactData.dialogVisibility,
  selectedUuid: state.reactData.selectedUuid,
  internetAvailable: state.reactData.internetAvailable,
  yearToAnalyze: state.reactData.yearToAnalyze,
  containers: state.containers,
  assets: state.assets,
  nodes: state.nodes,
});

const mapDispatchToDegeopViewProps: DegeopViewDispatchToPropsInterface = {
  emitElementAction: storeObjectActionCreator,
  emitUpdateReactData: updateReactData,
};

/*
DegeopViewPropsInterface identifica TUTTE le props che DegeopView riceve. In questo caso, sono date
dall'AND delle interfacce di mapStateToProps e mapDispatchToProps. Se ricevesse anche props
aggiuntive, avrei anche l'interfaccia di ownProps.
DegeopViewStateInterface descrive lo state della componente React.
 */
class DegeopView extends React.Component<DegeopViewPropsInterface,
  StateInterface> {

  public static contextTypes = {
    store: React.PropTypes.func.isRequired,
  };

  constructor(props: DegeopViewPropsInterface) {
    super(props);
    this.state = (defaultState[ElementType.ASSET]);
    this.onFormSubmitHook = this.onFormSubmitHook.bind(this);
  }

  public componentWillReceiveProps(nextProps: DegeopViewPropsInterface,
                                   nextContext: any): void {
    console.log('DegeopView willReceiveProps uuid = ' + nextProps.selectedUuid);
    const newElementType = nextProps.sidebarType.elementType;
    const newOperationType = nextProps.sidebarType.operationType;
    const oldElementType = this.props.sidebarType.elementType;
    const oldOperationType = this.props.sidebarType.operationType;
    const oldSelectedUuid = this.props.selectedUuid;
    const newSelectedUuid = nextProps.selectedUuid;
    console.log(OperationType[newOperationType]);
    const shouldUpdateState = !(oldElementType === ElementType.NODE && newElementType ===
    ElementType.NODE && oldOperationType === OperationType.INSERT && newOperationType ===
    OperationType.VIEW) &&
      (!(newElementType === ElementType.ANALYSIS) &&
      (
        (newOperationType === OperationType.INSERT) ||
      (!(newSelectedUuid === null && newElementType === ElementType.SCENARIO &&
      newOperationType === OperationType.VIEW) &&
      (oldElementType !== newElementType || oldSelectedUuid !== newSelectedUuid))
      ));
    if (shouldUpdateState) {
      console.log('DegeopView shouldUpdateState');
      let newState: StateInterface = null;
      if (newOperationType === OperationType.INSERT) {
        newState = defaultState[newElementType];
        newState = {
          ...newState, compiledData: { ...newState.compiledData, uuid: generateNewUUID() } };
      } else { // serve solo per VIEW forse? EDIT no?
        const { store } = this.context;
        console.log('store = ' + store + ' newElementType = ' + newElementType);
        const elementList = store.getState()[elementMap[newElementType]];
        const selectedElement = elementList.filter(
          (storeElement: StoreObject) => {
            return storeElement.uuid === newSelectedUuid;
          },
        )[0];
        const tempState = defaultState[newElementType];
        let defaultCompiledData: AllElementsInterface = tempState.compiledData;
        if (newElementType === ElementType.NODE && (selectedElement as AllNodeTypes).node_class ===
          NodeTypes.Sorgente) {
          defaultCompiledData = { ...defaultCompiledData, leadTime: 1 };
        }
        const newCompiledData: any =
          this.mergeSecondObjInFirstObj(defaultCompiledData, selectedElement);

        let newTrueValidationResults = null;
        if (newElementType === ElementType.NODE) {
          const currentNodeClass = (newCompiledData as AllNodeTypes).node_class;
          newTrueValidationResults =
            defaultTrueValidationResults[ElementType.NODE][currentNodeClass];
        } else {
          newTrueValidationResults = defaultTrueValidationResults[newElementType];
        }
        console.log('DGV newTrueValidationResults');
        console.log(newTrueValidationResults);
        newState = { ...tempState,
          compiledData: newCompiledData, validationResults: newTrueValidationResults,
          compiledDataIsValid: true};
      }
      this.setState(
        newState,() => {console.log('DPV state willReceive', this.state);});
      console.log('fine willreceve');
    }
  }

  public render() {
    const globalResult =
      calculateGlobalResult(this.props.containers,
                            this.props.assets, this.props.nodes, this.props.yearToAnalyze);
    let coloredNodeList;
    let globalEconomicresult;
    if (globalResult === null) {
      coloredNodeList = {};
      globalEconomicresult = null;
    } else {
      globalEconomicresult = globalResult.globalEconomicResult;
      coloredNodeList = globalResult.coloredNodeList;
    }
    return(
      <div>
      <div>
        <div
          style = {{ position: 'relative', width: '73%', height:'100%',
            display: 'inline ! important', float: 'left' }}
        >
          <connectedMap.default
            emitUpdateReactData = {this.props.emitUpdateReactData}
            handleChange = {this.handleChange.bind(this)}
            sidebarType = {this.props.sidebarType}
            coloredNodeList = {coloredNodeList}
          />
          <div style = {{ position: 'absolute', bottom:'10px', right: '35px' }} >
            <AddButton
              emitUpdateReactData = {this.props.emitUpdateReactData}
              operationType = {this.props.sidebarType.operationType}
            />
          </div>
          <div style = {{ position: 'absolute', top:'10px', right: '15px' }} >
            <connectedMessageWrapper.default
              emitUpdateReactData = {this.props.emitUpdateReactData}
              globalEconomicResult = {globalEconomicresult}
              sidebarType = {this.props.sidebarType}
            />
          </div>
        </div>
        <div
          style = {{ display: 'inline !important', width: '27%',
            height: '454px', float: 'right' }}
        >
        <Paper zDepth = {0} style = {{ height: '100%' }}>
          <form onSubmit = {this.onFormSubmitHook}>
            <SidebarFactory
              sidebarType = {this.props.sidebarType}
              compiledData = {this.state.compiledData}
              handleChange = {this.handleChange.bind(this)}
              emitUpdateReactData = {this.props.emitUpdateReactData}
              selectedUuid = {this.props.selectedUuid}
              validationResults = {this.state.validationResults}
              emitElementAction = {this.props.emitElementAction}
            />
            <ButtonFactory
              sidebarType = {this.props.sidebarType}
              emitUpdateReactData = {this.props.emitUpdateReactData}
              compiledDataIsValid = {this.state.compiledDataIsValid}
              selectedUuid = {this.props.selectedUuid}
            />
          </form>
        </Paper>
        </div>
      </div>
        <connectedDialogWrapper.default
          emitElementAction = {this.props.emitElementAction.bind(
            this, this.state.compiledData, this.props.sidebarType)}
          emitUpdateReactData = {this.props.emitUpdateReactData}
        />
        <connectedSnackbarWrapper.default
          emitUpdateReactData = {this.props.emitUpdateReactData}
        />
      </div>
    );
  }

  /*Ritorna un nuovo oggetto che ha solamente i campi del primo oggetto con il valore dei campi
  con lo stesso nome del secondo oggetto. Tralascia completamente i campi del secondo oggetto che
  non compaiono nel primo oggetto. Second deve avere come minimo tutti i campi di first.
  */
  private mergeSecondObjInFirstObj(first: any, second: any) {
    const third: any = {};
    console.log('mergeSecondObj first = ' + first + 'second = ' + second);
    for (const key in first) {
      if (first.hasOwnProperty(key)) {
        third[key] = first[key];
        if (second.hasOwnProperty(key)) {
          third[key] = second[key];
        }
      }
    }
    console.log('mergeSecondObj third = ' + third);
    return third;
  }

  private calculateCurrentDefaultData() {
    const elementType = this.props.sidebarType.elementType;
    let currentElementData = defaultCompiledDatas[elementType];
    if (elementType === ElementType.NODE) {
      const currentNodeType = (this.state.compiledData as BaseNode).node_class;
      currentElementData = currentElementData[currentNodeType];
    }
    return currentElementData;
  }

  private handleChange(key: string, stringValue: any): void {
    console.log('DPV handleChange');
    console.log(this.state);
    const elementType = this.props.sidebarType.elementType;
    let value = stringValue;

    const currentDefaultData = this.calculateCurrentDefaultData();
    if (typeof currentDefaultData[key] === 'number' && value !== '') {
      value = Number(value);
    }
    let newData = { ...this.state.compiledData, [key]: value };
    let newValidationResults = { ...this.state.validationResults };
    // controllare if key === nodeType, allora cambia compiledData
    if (key === 'node_class') { // value dev'essere uno dell'enum NodeTypes
      // (ad es. NodeTypes.Machine)
      console.log('DegeopView handleChange dentro if node_class value = ' + value);
      const specificNodeEmptyCompiledData = nodeTypeDataMap[value];
      newData = this.mergeSecondObjInFirstObj(specificNodeEmptyCompiledData, newData);
      console.log(newData);
      const specificFalseNodeValidationResults = specificNodeValidationResultsMap[value];
      console.log('handleChange newData = ' + specificNodeEmptyCompiledData.toString() +
        JSON.stringify(specificNodeEmptyCompiledData));
      newValidationResults =
        this.mergeSecondObjInFirstObj(specificFalseNodeValidationResults, newValidationResults);
    }

    const patterns = validationPatternsMap[elementType];
    const valueNotEmpty =
      (value !== null) && (value !== undefined) && (value !== '');
    let valueValid = true;
    // se il valore ha anche un pattern associato, lo controlla
    if (patterns !== null && patterns.hasOwnProperty(key)) {
      const regExp = new RegExp(patterns[key], 'i');
      valueValid = regExp.test(value.toString());
    }
    const valueCompletelyValid = valueNotEmpty && valueValid;
    newValidationResults = { ...newValidationResults, [key]: valueCompletelyValid };
    let valuesAllValid = true;
    // controlla che tutti i valori siano validi (non nulli e rispettanti il pattern)
    for (const validationKey in newValidationResults) {
      if (newValidationResults.hasOwnProperty(validationKey)) {
        if (newValidationResults[validationKey] !== true) {
          valuesAllValid = false;
          break;
        }
      }
    }
    console.log('DegeopView handleChange prima di setState ' + newData);
    this.setState(
      { ...this.state, compiledData: newData, validationResults : newValidationResults,
        compiledDataIsValid: valuesAllValid},
      () => {console.log('DPV state handleChange', this.state);});
  }

  private onFormSubmitHook(event: any) {
    console.log('DPV form submit');
    event.preventDefault();
    const { elementType, operationType } = this.props.sidebarType;
    this.props.emitElementAction(this.state.compiledData, this.props.sidebarType);
    const elementToVisualize = elementNameMap[elementType];
    const operationToVisualize =
      operationType === OperationType.INSERT ? ' aggiunto ' : ' modificato ';
    this.props.emitUpdateReactData({
      sidebarType: {
        elementType,
        operationType: OperationType.VIEW,
      },
      selectedUuid: this.state.compiledData.uuid,
      snackbarVisibility: true,
      snackbarMessage: elementToVisualize + operationToVisualize + 'con successo',
      snackbarDuration: 3000,
    });
  }
}

DegeopView.contextTypes = {
  store: React.PropTypes.object,
};

/*
Riceve mapStateToProps e mapDispatchToProps. Nelle angolari metto nei primi 2 posti i tipi di
queste due funzioni/oggetti. Nel terzo metto i tipi di eventuali ownProps.
 */
export default connect<DegeopViewStateToPropsInterface, DegeopViewDispatchToPropsInterface, null>
(mapStateToDegeopViewProps, mapDispatchToDegeopViewProps)(DegeopView);
