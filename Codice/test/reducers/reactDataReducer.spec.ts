// Viene verificato che l'OptionReducer esegua correttamente l'azione
// ricevuta sull'oggetto reactData

import { reactData } from '../../source/store/reducer/reactDataReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('reactDataReducer', () => {
  it('cambia l\'opzione sidebarType', () => {
    const newReactData = reactData(stubStore.reactData, stubObjects.actionSideBarTypeOption);
    expect(newReactData.sidebarType).toEqual(stubObjects.objectOptionSidebarType.sidebarType);
  });
  it('cambia l\'opzione dialogVisibility', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectDialogVisibilityOption);
    expect(newReactData.dialogVisibility).toEqual(
      stubObjects.objectDialogVisibility.dialogVisibility);
  });
  it('cambia l\'opzione messageVisibility', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectMessageVisibilityOption);
    expect(newReactData.messageVisibility).toEqual(
      stubObjects.objectMessageVisibility.messageVisibility);
  });
  it('cambia l\'opzione message', () => {
    const newReactData = reactData(stubStore.reactData, stubObjects.actionObjectMessageOption);
    expect(newReactData.message).toEqual(stubObjects.objectMessage.message);
  });
  it('cambia l\'opzione snackbarMessage', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectSnackbarMessageOption);
    expect(newReactData.snackbarMessage).toEqual(stubObjects.objectSnackbarMessage.snackbarMessage);
  });
  it('cambia l\'opzione snackbarDuration', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectSnackbarDurationOption);
    expect(newReactData.snackbarDuration).toEqual(
      stubObjects.objectSnackbarDuration.snackbarDuration);
  });
  it('cambia l\'opzione snackbarVisibility', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectSnackbarVisibilityOption);
    expect(newReactData.snackbarVisibility).toEqual
    (stubObjects.objectSnackbarVisibility.snackbarVisibility);
  });
  it('cambia l\'opzione selectedUuid', () => {
    const newReactData = reactData(stubStore.reactData, stubObjects.actionObjectSelectedUuidOption);
    expect(newReactData.selectedUuid).toEqual(stubObjects.objectSelectedUuid.selectedUuid);
  });
  it('cambia l\'opzione internetAvailable', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectInternetAvailableOption);
    expect(newReactData.internetAvailable).toEqual(
      stubObjects.objectInternetAvailable.internetAvailable);
  });
  it('cambia l\'opzione isAnalyzing', () => {
    const newReactData = reactData(stubStore.reactData, stubObjects.actionObjectIsAnalyzingOption);
    expect(newReactData.isAnalyzing).toEqual(stubObjects.objectIsAnalyzing.isAnalyzing);
  });
  it('cambia l\'opzione yearToAnalyze', () => {
    const newReactData = reactData(
      stubStore.reactData, stubObjects.actionObjectYearToAnalyzeOption);
    expect(newReactData.yearToAnalyze).toEqual(stubObjects.objectYearToAnalyze.yearToAnalyze);
  });
  it('cambia l\'opzione centerTimestamp', () => {
    const newReactData = reactData(
      stubStore.reactData,stubObjects.actionObjectCenterTimestampOption);
    expect(newReactData.centerTimestamp).toEqual(stubObjects.objectCenterTimestamp.centerTimestamp);
  });
});
