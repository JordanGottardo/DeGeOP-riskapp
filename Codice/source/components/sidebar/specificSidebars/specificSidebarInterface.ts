/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/specificSidebarInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */

import { AllValidationResultsType, CompiledDataInterface } from '../../defaultState';
import { ElementType,
  ActionCreatorInterface, OperationType } from '../../../store/action/actionInterface';
import { Scenario } from '../../../store/types/scenario';
import { Container } from '../../../store/types/container';

export type SpecificSidebarOwnPropsInterface = CompiledDataInterface & {
  operationType: OperationType;
  handleChange: (key: string, value: any) => void;
  validationResults: AllValidationResultsType;
  emitUpdateReactData?: ActionCreatorInterface;
  emitElementAction?: ActionCreatorInterface;
  emitStartAnalysisAction?: ActionCreatorInterface;
  selectedUuid?: string;
  scenarios?: Scenario[];
  elementType?: ElementType;
  containers?: Container[];
  requestedAnalysis?: string[];
  yearToAnalyze?: number;
};

export interface ScenarioSidebarStateToPropsInterface {
  scenarios: Scenario[];
}

export interface AnalysisSidebarStateToPropsInterface {
  scenarios: Scenario[];
  containers: Container[];
}

export interface AnalysisSidebarStateInterface {
  notAnalyzedScenarios: NotAnalyzedScenario[];
}

export interface AnalysisSidebarDispatchToPropsInterface {
  [name: string]: ActionCreatorInterface;
}

export interface NotAnalyzedScenario {
  scenario: Scenario;
  toRequest: boolean;
}
