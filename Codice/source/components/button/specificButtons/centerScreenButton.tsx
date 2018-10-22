
import * as React from 'react';
import { CenterScreenButtonPropsInterface } from './centerScreenButtonInterface';
import { OperationType } from '../../../store/action/actionInterface';
import { IconButton } from 'material-ui';
import { DeviceGpsFixed } from 'material-ui/svg-icons';

export class CenterScreenButton extends React.Component<CenterScreenButtonPropsInterface, null> {
  constructor(props: CenterScreenButtonPropsInterface) {
    super(props);
    this.onTimestampClick = this.onTimestampClick.bind(this);
  }

  public render() {
    const isViewSidebar: boolean = this.props.operationType === OperationType.VIEW;
    const isEditSidebar: boolean = this.props.operationType === OperationType.EDIT;
    if (!isViewSidebar && !isEditSidebar) {
      return null;
    }
    return (
      <IconButton
        iconStyle = {{ display: 'inline', float: 'right', width:'64px',
          marginTop: '8px' }}
        tooltip = "Centra elemento"
        tooltipPosition = "bottom-center"
        onClick = {this.onTimestampClick}
      >
        <DeviceGpsFixed color = "#B71C1C" />
      </IconButton>
    );
  }

  private onTimestampClick() {
    console.log('timestamp', this.props.emitUpdateReactData);
    this.props.emitUpdateReactData({
      centerTimestamp: Date.now(),
    });
  }
}
