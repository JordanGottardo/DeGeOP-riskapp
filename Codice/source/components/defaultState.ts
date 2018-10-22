/*
 * Author: Jordan Gottardo
 * File: source/components/defaultState.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { Asset, AssetOwner, AssetTypes } from '../store/types/asset';
import { Polygon } from '../store/types/coordinates';
import {
  BaseNode, NodeTypes, Node, Exit, Machine, Queue, Resource,
  Source,
} from '../store/types/node';
import { ElementType } from '../store/action/actionInterface';
import { Edge } from '../store/types/edge';
import { Scenario, ScenarioType } from '../store/types/scenario';
import { AllElementsInterface } from '../store/types/storeObjects';

const assetData: Asset = {
  uuid: '',
  description: '',
  name: '',
  type: AssetTypes.Cemento_prefabbricato,
  belong_to: AssetOwner.Assicurando,
  surface: 0,
  unitValue: 0,
  color: {
    a: 100,
    b: 28,
    g: 28,
    r: 183,
  },
  geoshape: null,
};

// export interface NodeDataInterface {
//   uuid: string;
//   label: string;
//   asset: string;
//   node_class: NodeTypes;
//   capacity?: number;
//   processingTime?: number;
//   value?: number;
//   leadTime?: number;
//   coordinate: number[];
// }

const baseNodeData: BaseNode = {
  uuid: '',
  label: '',
  asset: null,
  node_class: 0,
  coordinate: null,
};

const exitNodeData: Node<Exit> = {
  ...baseNodeData,
  node_class: NodeTypes.Uscita,
};

const machineNodeData: Node<Machine> = {
  ...baseNodeData,
  node_class: NodeTypes.Macchina,
  capacity: 0,
  processingTime: 0,
  value: 0,
};

const queueNodeData: Node<Queue> = {
  ...baseNodeData,
  node_class: NodeTypes.Coda,
  capacity: 0,
};

const resourceNodeData: Node<Resource> = {
  ...baseNodeData,
  node_class: NodeTypes.Risorsa,
};

const sourceNodeData: Node<Source> = {
  ...baseNodeData,
  node_class: NodeTypes.Sorgente,
  leadTime: 0,
};

export const nodeTypeDataMap = {
  [NodeTypes.Uscita]: exitNodeData,
  [NodeTypes.Macchina]: machineNodeData,
  [NodeTypes.Coda]: queueNodeData,
  [NodeTypes.Risorsa]: resourceNodeData,
  [NodeTypes.Sorgente]: sourceNodeData,
};

// export interface EdgeDataInterface {
//   uuid: string;
//   node_from: string;
//   node_to: string;
// }

const edgeData: Edge = {
  uuid: '',
  node_from: null,
  node_to: null,
};

// export interface ScenarioDataInterface {
//   uuid: string;
//   name: string;
//   scenario_type: string;
//   description: string;
//   event_time: number; // giorni dopo i quali l'evento inizia dall'inizio della simulazione
//   simulation_time: number; // mesi per i quali l'evento dura
//   intensity_measure: number;
//   p_s: number;               // exceedance probability, probability di ACCADIMENTO
//   application_area: string;
// }

const scenarioData: Scenario = {
  uuid: '',
  name: '',
  description: '',
  scenario_type: ScenarioType.Ciclone,
  intensity_measure: 0,
  p_s: 0,               // exceedance probability, probability di ACCADIMENTO
  event_time: 0,        // tempo di inizio
  application_area: null,
};

export interface CompiledDataInterface {
  compiledData: AllElementsInterface;
}

/*
************************ VALIDATION RESULTS ***********************
*/

/*
********** ASSET VALIDATION **********
*/

export interface AssetValidationResultsInterface {
  uuid: boolean;
  name: boolean;
  description: boolean;
  type: boolean;
  belong_to: boolean;
  surface: boolean;
  unitValue: boolean;
  color: boolean;
  geoshape: boolean;
}

const defaultTrueAssetValidationResults: AssetValidationResultsInterface = {
  uuid: true,
  name: true,
  description: true,
  type: true,
  belong_to: true,
  surface: true,
  unitValue: true,
  color: true,
  geoshape: true,
};

const defaultFalseAssetValidationResults: AssetValidationResultsInterface = {
  uuid: true,
  name: false,
  description: false,
  type: true,
  belong_to: true,
  surface: true,
  unitValue: true,
  color: true,
  geoshape: false,
};

/*
********** NODE VALIDATION **********
*/

export interface NodeValidationResultsInterface {
  asset: boolean;
  coordinate: boolean;
  node_class: boolean;
  uuid: boolean;
  label: boolean;
  capacity?: boolean;
  processingTime?: boolean;
  value?: boolean;
  leadTime?: boolean;
}

const defaultTrueBaseNodeValidationResults: NodeValidationResultsInterface = {
  asset: true,
  label: true,
  coordinate: true,
  node_class: true,
  uuid: true,
};

const defaultTrueExitNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultTrueBaseNodeValidationResults,
};

const defaultTrueMachineNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultTrueBaseNodeValidationResults,
  capacity: true,
  processingTime: true,
  value: true,

};

const defaultTrueQueueNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultTrueBaseNodeValidationResults,
  capacity: true,

};

const defaultTrueResourceNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultTrueBaseNodeValidationResults,

};

const defaultTrueSourceNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultTrueBaseNodeValidationResults,
  leadTime: true,
};

const defaultFalseBaseNodeValidationResults: NodeValidationResultsInterface = {
  asset: false,
  label: false,
  coordinate: false,
  node_class: true,
  uuid: true,
};

const defaultFalseExitNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultFalseBaseNodeValidationResults,
};

const defaultFalseMachineNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultFalseBaseNodeValidationResults,
  capacity: true,
  processingTime: true,
  value: true,

};

const defaultFalseQueueNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultFalseBaseNodeValidationResults,
  capacity: true,

};

const defaultFalseResourceNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultFalseBaseNodeValidationResults,

};

const defaultFalseSourceNodeValidationResults: NodeValidationResultsInterface = {
  ...defaultFalseBaseNodeValidationResults,
  leadTime: true,

};

/*
********** EDGE VALIDATION **********
*/

export interface EdgeValidationResultsInterface {
  uuid: boolean;
  node_from: boolean;
  node_to: boolean;
}

const defaultFalseEdgeValidationResults: EdgeValidationResultsInterface = {
  uuid: true,
  node_from: false,
  node_to: false,
};

const defaultTrueEdgeValidationResults: EdgeValidationResultsInterface = {
  uuid: true,
  node_from: true,
  node_to: true,
};

/*
********** SCENARIO VALIDATION **********
*/

export interface ScenarioValidationResultsInterface {
  name: boolean;
  description: boolean;
  scenario_type: boolean;
  application_area: boolean;
  intensity_measure: boolean;
  // readonly hazard: boolean;
  // readonly intensity: number;
  p_s: boolean;
  event_time: boolean;
}

const defaultTrueScenarioValidationResults: ScenarioValidationResultsInterface = {
  name: true,
  description: true,
  scenario_type: true,
  application_area: true,
  intensity_measure: true,
  // readonly hazard: boolean;
  // readonly intensity: number;
  p_s: true,
  event_time: true,
};

const defaultFalseScenarioValidationResults: ScenarioValidationResultsInterface = {
  name: false,
  description: false,
  scenario_type: true,
  application_area: false,
  intensity_measure: true,
  // readonly hazard: boolean;
  // readonly intensity: number;
  p_s: true,
  event_time: true,
};

// interface DefaultTrueValidationResultsInterface {
//   ASSET: AssetValidationResultsInterface;
//   NODE: NodeValidationResultsInterface;
//   EDGE: null;
//   SCENARIO: ScenarioValidationResultsInterface;
// }

export const defaultTrueValidationResults: any = {
  [ElementType.ASSET]: defaultTrueAssetValidationResults,
  [ElementType.NODE]: {
    [NodeTypes.Uscita]: defaultTrueExitNodeValidationResults,
    [NodeTypes.Macchina]: defaultTrueMachineNodeValidationResults,
    [NodeTypes.Coda]: defaultTrueQueueNodeValidationResults,
    [NodeTypes.Risorsa]: defaultTrueResourceNodeValidationResults,
    [NodeTypes.Sorgente]: defaultTrueSourceNodeValidationResults,
  },
  [ElementType.EDGE]: defaultTrueEdgeValidationResults,
  [ElementType.SCENARIO]: defaultTrueScenarioValidationResults,
};

export interface DataIsValidInterface {
  compiledDataIsValid: boolean;
}

export type AllValidationResultsType = (AssetValidationResultsInterface |
  NodeValidationResultsInterface | EdgeValidationResultsInterface |
  ScenarioValidationResultsInterface);

interface AllValidationResultsInterface {
  validationResults: AllValidationResultsType;
}

// TODO questo è esattamente DegeopViewStateInterface! Fare il merge fra questo file e DegeopViewInt
export type StateInterface = CompiledDataInterface &
  DataIsValidInterface & AllValidationResultsInterface;

interface DefaultStateInterface {
  [key: string]: StateInterface;
}

export const defaultState: DefaultStateInterface = {
  [ElementType.ASSET]: {
    compiledData: assetData,
    validationResults: defaultFalseAssetValidationResults,
    compiledDataIsValid: false,
  },
  [ElementType.NODE]: {
    compiledData: machineNodeData,
    validationResults: defaultFalseExitNodeValidationResults,
    compiledDataIsValid: false,
  },
  [ElementType.EDGE]: {
    compiledData: edgeData,
    validationResults: defaultFalseEdgeValidationResults,
    compiledDataIsValid: false,
  },
  [ElementType.SCENARIO]: {
    compiledData: scenarioData,
    validationResults: defaultFalseScenarioValidationResults,
    compiledDataIsValid: false,
  },
};

export const specificNodeValidationResultsMap = {
  [NodeTypes.Uscita]: defaultFalseExitNodeValidationResults,
  [NodeTypes.Macchina]: defaultFalseMachineNodeValidationResults,
  [NodeTypes.Coda]: defaultFalseQueueNodeValidationResults,
  [NodeTypes.Risorsa]: defaultFalseResourceNodeValidationResults,
  [NodeTypes.Sorgente]: defaultFalseSourceNodeValidationResults,
};

export const defaultCompiledDatas = {
  [ElementType.ASSET]: assetData,
  [ElementType.NODE]: {
    [NodeTypes.Uscita]: exitNodeData,
    [NodeTypes.Macchina]: machineNodeData,
    [NodeTypes.Coda]: queueNodeData,
    [NodeTypes.Risorsa]: resourceNodeData,
    [NodeTypes.Sorgente]: sourceNodeData,
  },
  [ElementType.EDGE]: edgeData,
  [ElementType.SCENARIO]: scenarioData,
};
