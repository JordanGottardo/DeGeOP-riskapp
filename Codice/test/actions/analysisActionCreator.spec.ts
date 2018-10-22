// Viene verificato che l'ActionCreator crei correttamente le azioni relative alle analisi

import { consumeAnalysisActionCreator,
  startAnalysisActionCreator } from '../../source/store/action/actionCreator';
import * as stubObjects from '../stubs/stubObjects.spec';

describe('Lo storeObjectActionCreator', () => {
  it('crea un\'azione di tipo START_ANALYSIS', () => {
    const actionAnalysisStart = startAnalysisActionCreator(
      stubObjects.objectAnalysis ,stubObjects.actionTypeStartAnalysis);
    expect(actionAnalysisStart).toEqual(stubObjects.actionAnalysisDefinedStart);
  });
  it('crea un\'azione di tipo VIEW_ANALYSIS', () => {
    const actionAnalysisConsume = consumeAnalysisActionCreator(
      stubObjects.objectAnalysis ,stubObjects.consumeTypeStartAnalysis);
    expect(actionAnalysisConsume).toEqual(stubObjects.actionAnalysisDefinedConsume);
  });
});
