/*
 * Author: Jordan Gottardo
 * File: source/components/sidebar/specificSidebars/edgeSidebar.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { SpecificSidebarOwnPropsInterface } from './specificSidebarInterface';
import { CardTitle } from 'material-ui';
import { edgeSubtitles, operationTypeIta } from '../../../viewUtils/viewUtils';
import { CenterScreenButton } from '../../button/specificButtons/centerScreenButton';

export class EdgeSidebar extends React.Component<SpecificSidebarOwnPropsInterface, null> {
  constructor(props: SpecificSidebarOwnPropsInterface) {
    super(props);
  }

  public render() {
    const operationType = this.props.operationType;
    const sidebarTitle = operationTypeIta[operationType] + ' arco';
    const sidebarSubtitle = edgeSubtitles[operationType];
    return (
      <div>
        <CardTitle
          title = {sidebarTitle}
          subtitle = {sidebarSubtitle}
          style = {{ width: '85%', display: 'inline', float: 'left' }}
        />
        <CenterScreenButton
          operationType = {this.props.operationType}
          emitUpdateReactData = {this.props.emitUpdateReactData}
        />
      </div>
    );
  }
}
