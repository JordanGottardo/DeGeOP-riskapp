/*
 * Author: Giulia Petenazzi
 * File: source/validationUtils/validationUtils.ts
 * Creation date: 2017-06-16
 * Last modified: 2017-08-22
 */
import { ElementType } from '../store/action/actionInterface';

interface AssetValidationPatternsInterface {
  name: string;
  description: string;
  surface: string;
  unitValue: string;
}

interface NodeValidationPatternsInterface {
  name: string;
  capacity: string;
  processingTime: string;
  value: string;
  leadTime: string;
}

interface ScenarioValidationPatternsInterface {
  name: string;
  description: string;
  event_time: string;
  intensity_measure: string;
  p_s: string;
}

export const assetValidationPatterns: AssetValidationPatternsInterface =  {
  name: '^\\w[\\w\\s\']{0,49}$',
  description: '^\\w[\\w\'\\s]{0,4999}$',
  surface: '^[0-9]{1,5}([\\.\\,]{1}[0-9]{1,2})?$',
  unitValue: '^[0-9]{1,20}([\\.\\,]{1}[0-9]{1,2})?$',
};

export const nodeValidationPatterns: NodeValidationPatternsInterface = {
  name: '^\\w[\\w\\s\']{0,49}$',
  capacity: '^[0-9]{1,5}([\\.\\,]{1}[0-9]{1,2})?$',
  processingTime: '^[0-9]{1,5}([\\.\\,]{1}[0-9]{1,2})?$',
  value: '^[0-9]{1,5}([\\.\\,]{1}[0-9]{1,2})?$',
  leadTime: '^[0-9]{1,5}([\\.\\,]{1}[0-9]{1,2})?$',
};

export const  scenarioValidationPatterns: ScenarioValidationPatternsInterface = {
  name: '^\\w[\\w\\s\']{0,49}$',
  description: '^\\w[\\w\'\\s]{0,4999}$',
  event_time: '^([1-9]|[12]\\d|3[0-6]|0)$',
  intensity_measure: '^([0-9]|([1-9][0-9])|100)$',
  p_s: '^[0-1]{1}([\\.\\,]{1}[0-9]{1,8})?$',
};

// interface ValidationPatternsMapInterface {
//   ASSET: AssetValidationPatternsInterface;
//   NODE: NodeValidationPatternsInterface;
//   EDGE: null;
//   SCENARIO: ScenarioValidationPatternsInterface;
//   ANALYSIS: null;
// }

export const validationPatternsMap: any = {
  [ElementType.ASSET]: assetValidationPatterns,
  [ElementType.NODE]: nodeValidationPatterns,
  [ElementType.EDGE]: null,
  [ElementType.SCENARIO]: scenarioValidationPatterns,
  [ElementType.ANALYSIS]: null,
};
