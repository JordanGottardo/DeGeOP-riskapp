// Viene verificato che l'AnalysisReducer esegua correttamente l'azione
// ricevuta sulla lista di Analsysis

import { requestedAnalysis } from '../../source/store/reducer/analysisReducer';
import * as stubObjects from '../stubs/stubObjects.spec';
import { stubStore } from '../stubs/stubStore.spec';

describe('L\'AnalysisReducer', () => {
  it('aggiunge un array di Analysis valido alla lista', () => {
    const newList = requestedAnalysis(
      stubStore.requestedAnalysis, stubObjects.actionAnalysisDefinedStart);
    const newAnalysis = stubObjects.objectAnalysis;
    expect(newList.length).toBe(stubStore.requestedAnalysis.length + 1);
    expect(newList).toEqual(newAnalysis);
  });
  it('consuma un array di Analysis valido dalla lista', () => {
    const newList = requestedAnalysis(
      stubStore.requestedAnalysis, stubObjects.actionAnalysisDefinedConsume);
    const newAnalysis = stubObjects.objectAnalysis;
    expect(newList.lastIndexOf(newAnalysis[0])).toBe(-1);
  });
});
