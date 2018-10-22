/*
 * Author: Giovanni Prete
 * File: source/store/types/reactDataOptionsInterface.ts
 * Creation date: 2017-06-02
 * Last modified: 2017-08-22
 */

import { SidebarTypeInterface } from './../../components/sidebar/sidebarTypeInterface';

/**
 * rappresenta l'interfaccia per la tipologia di sidebar
 */
export interface OptionSidebarTypeInterface {
  /**
   * rappresenta la tipologia di sidebar
   */
  sidebarType: SidebarTypeInterface;
}

/**
 * rappresenta l'interfaccia per la visibilità della dialog
 */
interface OptionDialogVisibilityInterface {
  /**
   * rappresenta l'opzione di visibilità riguardante la dialog
   */
  dialogVisibility: boolean;
}

/**
 * rappresenta l'interfaccia per un message box
 */
interface OptionMessageInterface {
  /**
   * rappresenta il messaggio per la message box
   */
  message: string;
}

/**
 * rappresenta l'interfaccia riguardante l'uuid selezionato
 */
interface OptionSelectedUuidInterface {
  /**
   * rappresenta l'uuid selezionato
   */
  selectedUuid: string;
}

/**
 * rappresenta l'interfaccia riguardante la presenza di connessione ad internet
 */
interface OptionInternetAvailableInterface {
  /**
   * rappresenta la presenza di connessione ad internet
   */
  internetAvailable: boolean;
}

/**
 * rappresenta l'interfaccia riguardante una richiesta di aggiornamento dell'analisi
 */
interface OptionUpdateAnalysisInterface {
  /**
   * rappresenta la presenza o meno di una richiesta di aggiornamento dell'analisi
   */
  updateAnalysisRequest: boolean;
}

/**
 * rappresenta l'interfaccia per la visibilità di un message
 */
interface OptionMessageVisibilityInterface {
  /**
   * rappresenta l'opzione di visibilità riguardante un message box
   */
  messageVisibility: boolean;
}

/**
 * rappresenta l'interfaccia per uno snackbar message
 */
interface OptionSnackbarMessageInterface {
  /**
   * rappresenta il messaggio per uno snackbar message
   */
  snackbarMessage: string;
}

/**
 * rappresenta l'interfaccia per la durata di visualizzazione dello snackbar
 */
interface OptionSnackbarDurationInterface {
  /**
   * rappresenta la durata di visualizzazione dello snackbar
   */
  snackbarDuration: number;
}

/**
 * rappresenta l'interfaccia per la visibilità di uno snackbar
 */
interface OptionSnackbarVisibilityInterface {
  /**
   * rappresenta l'opzione di visibilità riguardante uno snackbar
   */
  snackbarVisibility: boolean;
}

/**
 * rappresenta l'interfaccia riguardante lo stato dell'analisi (valore booleano)
 */
interface OptionIsAnalyzingInterface {
  /**
   * rappresenta lo stato dell'analisi (true solamente se un'analisi è in corso)
   */
  isAnalyzing: boolean;
}

/**
 * rappresenta l'interfaccia riguardante l'anno da analizzare
 */
interface OptionYearToAnalize {
  /**
   * rappresenta l'anno da analizzare
   */
  yearToAnalyze: number;
}

/**
 * rappresenta la durata di visualizzazione
 */
interface OptionCenterTimestamp {
  /**
   * rappresenta la durata di visualizzazione
   */
  centerTimestamp: number;
}

export type ReactDataOptionsInterface = OptionDialogVisibilityInterface | OptionSidebarTypeInterface
  | OptionSelectedUuidInterface | OptionInternetAvailableInterface | OptionUpdateAnalysisInterface |
  OptionMessageVisibilityInterface | OptionMessageInterface | OptionSnackbarMessageInterface |
  OptionSnackbarDurationInterface | OptionSnackbarVisibilityInterface | OptionIsAnalyzingInterface |
  OptionYearToAnalize | OptionCenterTimestamp;
