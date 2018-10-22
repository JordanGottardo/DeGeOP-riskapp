/*
 * Author: Jordan Gottardo
 * File: source/viewUtils/viewUtils.ts
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { ContainerStatus } from '../store/types/container';
import { ElementType, OperationType } from '../store/action/actionInterface';

export const containerStatusEnumToProgressValue: any = {
  [ContainerStatus.STATUS_EMPTY]: 16.32,
  [ContainerStatus.STATUS_CREATED]: 33.32,
  [ContainerStatus.STATUS_IN_QUEUE]: 49.98,
  [ContainerStatus.STATUS_STARTED]: 66.64,
  [ContainerStatus.STATUS_VALIDATED]: 83.3,
  [ContainerStatus.STATUS_COMPLETED]: 100,
};

export const elementNameMap: any = {
  [ElementType.ASSET]: 'Asset',
  [ElementType.NODE]: 'Nodo',
  [ElementType.EDGE]: 'Arco',
  [ElementType.SCENARIO]: 'Scenario',
};
export const operationTypeIta: any = {
  [OperationType.INSERT]: 'Inserimento',
  [OperationType.EDIT]: 'Modifica',
  [OperationType.VIEW]: 'Dettagli',
};
export const assetSubtitles: any = {
  [OperationType.INSERT]: 'Disegna l\'asset sulla mappa, compila i dati e salva',
  [OperationType.EDIT]: 'Modifica il perimetro dell\'asset sulla mappa, compila i dati e salva',
  [OperationType.VIEW]: 'Clicca su \"Modifica\" o \"Elimina\" per modificare o eliminare l\'asset',
};
export const nodeSubtitles: any = {
  [OperationType.INSERT]:
    'Posiziona il nodo all\'interno di un asset sulla mappa, compila i dati e salva',
  [OperationType.EDIT]:
    'Clicca all\'interno di un asset per riposizionare il nodo, compila i dati e salva',
  [OperationType.VIEW]: 'Clicca su \"Modifica\" o \"Elimina\" per modificare o eliminare il nodo',
};
export const edgeSubtitles: any = {
  [OperationType.INSERT]:
    'Clicca sui nodi di inizio e fine per tracciare l\'arco e salva',
  [OperationType.EDIT]:
    'Clicca sui nodi di inizio e fine per ritracciare l\'arco e salva',
  [OperationType.VIEW]: 'Clicca su \"Modifica\" o \"Elimina\" per modificare o eliminare l\'arco',
};
