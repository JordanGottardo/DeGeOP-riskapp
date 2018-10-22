/*
 * Author:Giulia Petenazzi
 * File: source/index.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import injectTapEventPlugin = require('react-tap-event-plugin');
import DegeopView from './components/degeopView';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store/reducer/rootReducer';
import { defaultStore } from './store/types/storeInterface';
import logger from 'redux-logger';
import { CallManager } from './callManager/callManager';
import { CallManagerMiddleware } from './callManager/callManagerMiddleware';
import { startAnalysisManagerMock } from './store/analysisManagerMock/analysisManagerMock';

injectTapEventPlugin();

let graphUuid: string = null;
let dev: boolean = false;
const targetEl = document.getElementById('reactcontent');
if (targetEl !== null) {
  graphUuid = targetEl.getAttribute('uuid');
}
if (graphUuid == null) {
  dev = true;
}

const actionMiddleware = new CallManagerMiddleware();
export const store = createStore(
  rootReducer,
  defaultStore,
  applyMiddleware(logger, actionMiddleware.middleware));

const callManager = new CallManager(store, graphUuid, window.location.pathname.split('/')[3], dev);
actionMiddleware.attach(callManager);

startAnalysisManagerMock();

class AppContainer extends React.Component<{}, {}> {
  public render() {
    return (
      <Provider store = {store}>
        <DegeopView />
      </Provider>
    );
  }
}

export default AppContainer;
