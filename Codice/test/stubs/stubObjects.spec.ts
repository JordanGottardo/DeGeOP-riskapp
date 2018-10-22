import { ContainerStatus } from '../../source/store/types/container';
import { ScenarioType } from '../../source/store/types/scenario';
import { OptionSidebarTypeInterface } from '../../source/store/types/reactDataOptionsInterface';
import { ActionInterface, OperationType,
  ElementType } from '../../source/store/action/actionInterface';
import { NodeTypes } from '../../source/store/types/node';
import { AssetOwner, AssetTypes } from '../../source/store/types/asset';

// OPTION
export let objectOptionSidebarType: OptionSidebarTypeInterface = {
  sidebarType: {
    operationType: OperationType.VIEW,
    elementType: ElementType.ASSET,
  },
};
export let objectDialogVisibility = {
  dialogVisibility: true,
};
export let objectMessageVisibility = {
  messageVisibility: true,
};
export let objectMessage = {
  message: 'Test automatico',
};
export let objectSnackbarMessage = {
  snackbarMessage: 'Test automatico',
};
export let objectSnackbarDuration = {
  snackbarDuration: 10,
};
export let objectSnackbarVisibility = {
  snackbarVisibility: true,
};
export let objectSelectedUuid = {
  selectedUuid: null,
};
export let objectInternetAvailable = {
  internetAvailable: false,
};
export let objectIsAnalyzing = {
  isAnalyzing: true,
};
export let objectYearToAnalyze = {
  yearToAnalyze: 1,
};
export let objectCenterTimestamp = {
  centerTimestamp: Date.now(),
};

// OPTION ACTIONS
export let actionSideBarTypeOption = {
  type: ElementType.REACTDATA,
  payload: objectOptionSidebarType,
  operation: OperationType.UPDATE,
};
export let actionObjectDialogVisibilityOption = {
  type: ElementType.REACTDATA,
  payload: objectDialogVisibility,
  operation: OperationType.UPDATE,
};
export let actionObjectMessageVisibilityOption = {
  type: ElementType.REACTDATA,
  payload: objectMessageVisibility,
  operation: OperationType.UPDATE,
};
export let actionObjectMessageOption = {
  type: ElementType.REACTDATA,
  payload: objectMessage,
  operation: OperationType.UPDATE,
};
export let actionObjectSnackbarMessageOption = {
  type: ElementType.REACTDATA,
  payload: objectSnackbarMessage,
  operation: OperationType.UPDATE,
};
export let actionObjectSnackbarDurationOption = {
  type: ElementType.REACTDATA,
  payload: objectSnackbarDuration,
  operation: OperationType.UPDATE,
};
export let actionObjectSnackbarVisibilityOption = {
  type: ElementType.REACTDATA,
  payload: objectSnackbarVisibility,
  operation: OperationType.UPDATE,
};
export let actionObjectSelectedUuidOption = {
  type: ElementType.REACTDATA,
  payload: objectSelectedUuid,
  operation: OperationType.UPDATE,
};
export let actionObjectInternetAvailableOption = {
  type: ElementType.REACTDATA,
  payload: objectInternetAvailable,
  operation: OperationType.UPDATE,
};
export let actionObjectIsAnalyzingOption = {
  type: ElementType.REACTDATA,
  payload: objectIsAnalyzing,
  operation: OperationType.UPDATE,
};
export let actionObjectYearToAnalyzeOption = {
  type: ElementType.REACTDATA,
  payload: objectYearToAnalyze,
  operation: OperationType.UPDATE,
};
export let actionObjectCenterTimestampOption = {
  type: ElementType.REACTDATA,
  payload: objectCenterTimestamp,
  operation: OperationType.UPDATE,
};

// ASSET
export let objectAsset = {
  uuid: '06eb5141-e3f6-432c-ab6a-9e09ed2bc894',
  description: 'descrizione Asset stub',
  name: 'Asset di stub',
  type: AssetTypes.Acciaio,
  belong_to: AssetOwner.Assicurando,
  surface: 23,
  unitValue: 15,
  color: {
    a: 1.0,
    b: 0,
    g: 165,
    r: 255,
  },
  geoshape: 'SRID=4326;POLYGON ((12.1230130000000000 45.4327670000000000, ' +
  '12.1231480000000000 45.4327940000000000, 12.1230600000000000 45.4331040000000000,' +
  ' 12.1229040000000000 45.4330860000000000, 12.1230130000000000 45.4327670000000000))',
};

// ASSET ACTIONS
export let actionAssetDefinedInsert = {
  type: ElementType.ASSET,
  payload: objectAsset,
  operation: OperationType.INSERT,
};
export let actionAssetDefinedUpdate = {
  type: ElementType.ASSET,
  payload: objectAsset,
  operation: OperationType.EDIT,
};
export let actionAssetDefinedDelete = {
  type: ElementType.ASSET,
  payload: objectAsset,
  operation: OperationType.VIEW,
};

// NODE
export let objectNodeResource = {
  uuid: '61becb6b-4d50-4877-873b-41b1b33c91a2',
  label: 'nodo risorsa stub',
  asset: '566c970e-77d7-4c11-b640-d9a5c0e3843a',
  node_class: NodeTypes.Risorsa,
  coordinate: 'SRID=4326;POINT (12.1230250000000000 45.4328650000000000)',
};
export let objectNodeExit = {
  uuid: 'c825a796-91fe-43c8-90be-8579bb97b823',
  label: 'nodo uscita stub',
  asset: '6f796fc3-ee09-4830-9552-831a1ee547f1',
  node_class: NodeTypes.Uscita,
  coordinate: 'SRID=4326;POINT (12.1237350000000000 45.4331170000000000)',
};
export let objectNodeMachine = {
  uuid: 'adac00d9-8308-4ff9-8d9d-013085037545',
  label: 'nodo macchina stub',
  asset: '566c970e-77d7-4c11-b640-d9a5c0e3843a',
  node_class: NodeTypes.Macchina,
  processingTime: 10,
  value: 50,
  coordinate: 'SRID=4326;POINT (12.1229880000000000 45.4330480000000000)',
  capacity: 40,
};
export let objectNodeQueue = {
  uuid: 'bef7cd4e-c486-42d3-aae0-42bc8397e1f1',
  label: 'nodo coda stub',
  asset: '06eb5141-e3f6-432c-ab6a-9e09ed2bc894',
  node_class: NodeTypes.Coda,
  coordinate: 'SRID=4326;POINT (12.1230110000000000 45.4327120000000000)',
  capacity: 40,
};
export let objectNodeSource = {
  uuid: 'ac19015a-884d-47bc-b6c2-396d54233e0f',
  label: 'nodo sorgente stub',
  asset: '6f796fc3-ee09-4830-9552-831a1ee547f1',
  node_class: NodeTypes.Sorgente,
  leadTime: 23,
  coordinate: 'SRID=4326;POINT (12.1237770000000000 45.4329630000000000)',
};

// NODE ACTIONS
export let actionNodeMachineDefinedInsert = {
  type: ElementType.NODE,
  payload: objectNodeMachine,
  operation: OperationType.INSERT,
};
export let actionNodeQueueDefinedInsert = {
  type: ElementType.NODE,
  payload: objectNodeQueue,
  operation: OperationType.INSERT,
};
export let actionNodeSourceDefinedInsert = {
  type: ElementType.NODE,
  payload: objectNodeSource,
  operation: OperationType.INSERT,
};
export let actionNodeExitDefinedInsert = {
  type: ElementType.NODE,
  payload: objectNodeExit,
  operation: OperationType.INSERT,
};
export let actionNodeResourceDefinedInsert = {
  type: ElementType.NODE,
  payload: objectNodeResource,
  operation: OperationType.INSERT,
};
export let actionNodeMachineDefinedUpdate = {
  type: ElementType.NODE,
  payload: objectNodeMachine,
  operation: OperationType.EDIT,
};
export let actionNodeQueueDefinedUpdate = {
  type: ElementType.NODE,
  payload: objectNodeQueue,
  operation: OperationType.EDIT,
};
export let actionNodeSourceDefinedUpdate = {
  type: ElementType.NODE,
  payload: objectNodeSource,
  operation: OperationType.EDIT,
};
export let actionNodeExitDefinedUpdate = {
  type: ElementType.NODE,
  payload: objectNodeExit,
  operation: OperationType.EDIT,
};
export let actionNodeResourceDefinedUpdate = {
  type: ElementType.NODE,
  payload: objectNodeResource,
  operation: OperationType.EDIT,
};
export let actionNodeMachineDefinedDelete = {
  type: ElementType.NODE,
  payload: objectNodeMachine,
  operation: OperationType.VIEW,
};
export let actionNodeQueueDefinedDelete = {
  type: ElementType.NODE,
  payload: objectNodeQueue,
  operation: OperationType.VIEW,
};
export let actionNodeSourceDefinedDelete = {
  type: ElementType.NODE,
  payload: objectNodeSource,
  operation: OperationType.VIEW,
};
export let actionNodeExitDefinedDelete = {
  type: ElementType.NODE,
  payload: objectNodeExit,
  operation: OperationType.VIEW,
};
export let actionNodeResourceDefinedDelete = {
  type: ElementType.NODE,
  payload: objectNodeResource,
  operation: OperationType.VIEW,
};

// EDGE
export let objectEdge = {
  uuid: '12348653-33ed-4256-ba54-cf0f5fb9fc7a',
  node_from: 'ac19015a-884d-47bc-b6c2-396d54233e0f',
  node_to: 'bef7cd4e-c486-42d3-aae0-42bc8397e1f1',
};
// EDGE ACTIONS
export let actionEdgeDefinedInsert = {
  type: ElementType.EDGE,
  payload: objectEdge,
  operation: OperationType.INSERT,
};
export let actionEdgeDefinedUpdate = {
  type: ElementType.EDGE,
  payload: objectEdge,
  operation: OperationType.EDIT,
};
export let actionEdgeDefinedDelete = {
  type: ElementType.EDGE,
  payload: objectEdge,
  operation: OperationType.VIEW,
};

// SCENARIO
export let objectScenario = {
  uuid: 'a634d242-136f-4598-94e2-e83154580b52',
  name: 'Scenario stub di test',
  description: 'Scenario stub di test',
  scenario_type: ScenarioType.Rottura_di_macchinari,
  intensity_measure: 15,
  p_s: 15,               // exceedance probability, probability di ACCADIMENTO
  event_time: 15,        // tempo di inizio
  application_area: 'SRID=4326;POLYGON ((12.1220294095515282 45.4332598545622091,' +
  ' 12.1224692918299706 45.4333840804374915, 12.1224371053217901 45.4330791618919250,' +
  ' 12.1221152402400048 45.4331280995472753, 12.1220294095515282 45.4332598545622091))',
};
// SCENARIO ACTIONS
export let actionScenarioDefinedInsert = {
  type: ElementType.SCENARIO,
  payload: objectScenario,
  operation: OperationType.INSERT,
};
export let actionScenarioDefinedUpdate = {
  type: ElementType.SCENARIO,
  payload: objectScenario,
  operation: OperationType.EDIT,
};
export let actionScenarioDefinedDelete = {
  type: ElementType.SCENARIO,
  payload: objectScenario,
  operation: OperationType.VIEW,
};

// CONTAINER
export let objectContainer = {
  uuid: 'a75276b0-a873-4c86-b167-209e7f5ad05e',
  scenario: 'a634d242-136f-4598-94e2-e83154580b52',
  status: ContainerStatus.STATUS_VALIDATED,
  result: null,
};

// CONTAINER ACTIONS
export let actionContainerDefinedInsert = {
  type: ElementType.CONTAINER,
  payload: objectContainer,
  operation: OperationType.INSERT,
};
export let actionContainerDefinedUpdate = {
  type: ElementType.CONTAINER,
  payload: objectContainer,
  operation: OperationType.EDIT,
};
export let actionContainerDefinedDelete = {
  type: ElementType.CONTAINER,
  payload: objectContainer,
  operation: OperationType.VIEW,
};

// ANALYSIS
export let objectAnalysis = ['a634d242-136f-4598-94e2-e83154580b52'];

// ANALYSIS ACTIONS
export let actionAnalysisDefinedStart = {
  type: ElementType.ANALYSIS,
  payload: objectAnalysis,
  operation: OperationType.START,
};
export let actionAnalysisDefinedConsume = {
  type: ElementType.ANALYSIS,
  payload: objectAnalysis,
  operation: OperationType.VIEW,
};

// ACTION CREATOR
export let actionTypeInsertAsset = {
  operationType: OperationType.INSERT,
  elementType: ElementType.ASSET,
};
export let actionTypeEditAsset = {
  operationType: OperationType.EDIT,
  elementType: ElementType.ASSET,
};
export let actionTypeDeleteAsset = {
  operationType: OperationType.VIEW,
  elementType: ElementType.ASSET,
};
export let actionTypeInsertNode = {
  operationType: OperationType.INSERT,
  elementType: ElementType.NODE,
};
export let actionTypeEditNode = {
  operationType: OperationType.EDIT,
  elementType: ElementType.NODE,
};
export let actionTypeDeleteNode = {
  operationType: OperationType.VIEW,
  elementType: ElementType.NODE,
};
export let actionTypeInsertEdge = {
  operationType: OperationType.INSERT,
  elementType: ElementType.EDGE,
};
export let actionTypeEditEdge = {
  operationType: OperationType.EDIT,
  elementType: ElementType.EDGE,
};
export let actionTypeDeleteEdge = {
  operationType: OperationType.VIEW,
  elementType: ElementType.EDGE,
};
export let actionTypeInsertScenario = {
  operationType: OperationType.INSERT,
  elementType: ElementType.SCENARIO,
};
export let actionTypeEditScenario = {
  operationType: OperationType.EDIT,
  elementType: ElementType.SCENARIO,
};
export let actionTypeDeleteScenario = {
  operationType: OperationType.VIEW,
  elementType: ElementType.SCENARIO,
};
export let actionTypeReactDataUpdate = {
  operationType: OperationType.UPDATE,
  elementType: ElementType.REACTDATA,
};
export let actionTypeStartAnalysis = {
  operationType: OperationType.START,
  elementType: ElementType.ANALYSIS,
};
export let consumeTypeStartAnalysis = {
  operationType: OperationType.VIEW,
  elementType: ElementType.ANALYSIS,
};
export let actionTypeInsertContainer = {
  operationType: OperationType.INSERT,
  elementType: ElementType.CONTAINER,
};
export let actionTypeEditContainer = {
  operationType: OperationType.EDIT,
  elementType: ElementType.CONTAINER,
};
export let actionTypeDeleteContainer = {
  operationType: OperationType.VIEW,
  elementType: ElementType.CONTAINER,
};
