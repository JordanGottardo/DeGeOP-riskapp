/*
 * Author: Giulia Petenazzi
 * File: source/components/dropDown/dropDownInterface.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
export interface DropDownOwnPropsInterface {
  floatingLabelText?: string; // testo di aiuto del DropDown
  value: any; // valore (che dev'essere dentro uno state) che il DropDown deve assumere
  elements: any; // array di valori (tipicamente un Enum) che comporranno i MenuItem
  handleChangeKey: string; // nome del campo dello state da cambiare tramite l'handleChange
  // dall'onChange del DropDown
  handleChange: (key: string, value: any) => void;
  [x: string]: any; // qualsiasi altra prop
}
