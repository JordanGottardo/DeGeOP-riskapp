/*
 * Author: Giulia Petenazzi
 * File: source/components/sketch/sketchInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { Color } from '../../store/types/asset';

export interface SketchInterface {
  color: Color;
  handleChange: (key: string, value: any) => void;
  disabled: boolean;
}

export interface SketchStateInterface {
  displayColorPicker: boolean;
}
