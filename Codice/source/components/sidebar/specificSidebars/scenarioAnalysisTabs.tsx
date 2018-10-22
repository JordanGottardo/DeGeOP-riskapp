/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/scenarioAnalysisTabs.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import { SpecificSidebarOwnPropsInterface } from './specificSidebarInterface';
import * as React from 'react';
import { Tab, Tabs } from 'material-ui';
import { ElementType } from '../../../store/action/actionInterface';
import * as connectedScenarioSidebar from './scenarioSidebar';

import * as connectedAnalysisSidebar from './analysisSidebar';

export class ScenarioAnalysisTabs extends React.Component<SpecificSidebarOwnPropsInterface, null> {

  constructor(props: SpecificSidebarOwnPropsInterface) {
    super(props);
    this.onTabChangeHook = this.onTabChangeHook.bind(this);
  }

  public render() {
    return (
      <div>
        <Tabs
          value = {this.props.elementType}
          onChange = {this.onTabChangeHook}
        >
          <Tab label = "Scenari" value = {ElementType.SCENARIO}>
            <connectedScenarioSidebar.default
              compiledData = {this.props.compiledData}
              operationType = {this.props.operationType}
              handleChange = {this.props.handleChange}
              validationResults = {this.props.validationResults}
              selectedUuid = {this.props.selectedUuid}
              emitUpdateReactData = {this.props.emitUpdateReactData}
            />
          </Tab>
          <Tab label = "Analisi" value = {ElementType.ANALYSIS}>
            <connectedAnalysisSidebar.default
              compiledData = {this.props.compiledData}
              operationType = {this.props.operationType}
              handleChange = {this.props.handleChange}
              validationResults = {this.props.validationResults}
              emitElementAction = {this.props.emitElementAction}
              emitUpdateReactData = {this.props.emitUpdateReactData}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }

  private onTabChangeHook(value: any) {
    console.log('onTabChangehook = ' + typeof(value));
    this.props.emitUpdateReactData({
      sidebarType: {
        operationType: this.props.operationType,
        elementType: value,
      },
      selectedUuid: null,
    });
  }
}
