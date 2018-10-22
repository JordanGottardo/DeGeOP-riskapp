/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/sidebarFactory.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { SidebarFactoryOwnPropsInterface } from './sidebarFactoryInterface';
import { AssetSidebar } from './specificSidebars/assetSidebar';
import { DefaultSidebar } from './specificSidebars/defaultSidebar';
import { NodeSidebar } from './specificSidebars/nodeSidebar';
import { EdgeSidebar } from './specificSidebars/edgeSidebar';
import { ElementType, OperationType } from '../../store/action/actionInterface';
import * as connectedScenarioSidebar from './specificSidebars/scenarioSidebar';
import { ScenarioAnalysisTabs } from './specificSidebars/scenarioAnalysisTabs';

export class SidebarFactory extends React.Component<SidebarFactoryOwnPropsInterface, null> {

  constructor(props: SidebarFactoryOwnPropsInterface) {
    super(props);
  }

  public render() {
    const { elementType, operationType } = this.props.sidebarType;
    const sidebarMap = this.getSidebarMap();

    let sidebarToRender = null;
    if (elementType === ElementType.SCENARIO && operationType !== OperationType.VIEW) {
      sidebarToRender =
        (
        <connectedScenarioSidebar.default
          compiledData = {this.props.compiledData}
          operationType = {operationType}
          handleChange = {this.props.handleChange}
          validationResults = {this.props.validationResults}
          selectedUuid = {this.props.selectedUuid}
          emitUpdateReactData = {this.props.emitUpdateReactData}
        />);
    } else {
      sidebarToRender = sidebarMap[elementType];
    }
    return (
      <div>
        {sidebarToRender}
      </div>
    );
  }

  private getSidebarMap() {
    const propsToPass = {
      compiledData: this.props.compiledData,
      operationType: this.props.sidebarType.operationType,
      handleChange: this.props.handleChange,
      validationResults: this.props.validationResults,
      emitUpdateReactData: this.props.emitUpdateReactData,
    };

    const sidebarMap = {
      [ElementType.ASSET]: <AssetSidebar {...propsToPass} />,
      [ElementType.NODE]: <NodeSidebar {...propsToPass} />,
      [ElementType.EDGE]: <EdgeSidebar {...propsToPass} />,
      [ElementType.SCENARIO]:
      (
        <ScenarioAnalysisTabs
          {...propsToPass}
          selectedUuid = {this.props.selectedUuid}
          emitUpdateReactData = {this.props.emitUpdateReactData}
          emitElementAction = {this.props.emitElementAction}
        />),
      [ElementType.ANALYSIS]:
        (
          <ScenarioAnalysisTabs
            {...propsToPass}
            selectedUuid = {this.props.selectedUuid}
            emitUpdateReactData = {this.props.emitUpdateReactData}
            emitElementAction = {this.props.emitElementAction}
          />),
      // [ElementType.SCENARIO]:
      // (
      //   <connectedScenarioSidebar.default
      //     {...propsToPass}
      //     selectedUuid = {this.props.selectedUuid}
      //     emitUpdateReactData = {this.props.emitUpdateReactData}
      //   />),
      // [ElementType.ANALYSIS]: <AnalysisSidebar {...propsToPass} />,
    };
    return sidebarMap;
  }
}
