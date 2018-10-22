/*
 * Author: Jordan Gottardo
 * File: source/components/messageWrapper/messageWrapper.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { StoreInterface } from '../../store/types/storeInterface';
import {
  MessageWrapperOwnPropsInterface,
  MessageWrapperPropsInterface, MessageWrapperStateInterface,
  MessageWrapperStateToPropsInterface,
} from './messageWrapperInterface';
import { connect } from 'react-redux';
import {
  Avatar,
  Card, CardActions, CardHeader, Chip, Paper, RaisedButton, Table, TableBody, TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui';
import { LegendaDialog } from './legendaDialog/legendaDialog';
import { ElementType } from '../../store/action/actionInterface';
import { getCompletedContainers } from '../../storeUtils/storeUtils';

const mapStateToMessageWrapperProps = (state: StoreInterface):
MessageWrapperStateToPropsInterface => ({
  messageVisibility: state.reactData.messageVisibility,
  message: state.reactData.message,
  containers: state.containers,
  assets: state.assets,
  nodes: state.nodes,
});

class MessageWrapper extends React.Component<
  MessageWrapperPropsInterface, MessageWrapperStateInterface> {

  constructor(props: MessageWrapperPropsInterface) {
    super(props);
    this.state = {
      legendaVisibility: false,
    };
    this.onLegendaOpenClick = this.onLegendaOpenClick.bind(this);
    this.onLegendaCloseClick = this.onLegendaCloseClick.bind(this);
  }

  public render() {
    const completeContainers = getCompletedContainers(this.props.containers);
    // oldAvatar avatar = "http://imgur.com/download/NxCn4YR"
    if (this.props.sidebarType.elementType !== ElementType.ANALYSIS ||
      completeContainers.length === 0) {
      return null;
    }
    const globalEconomicResult = this.props.globalEconomicResult;
    let yieldMessage = null;
    let percentageMessage = null;
    if (!globalEconomicResult) {
      yieldMessage = 'Nessuna analisi completa';
    } else {
      const oldEconomicResult =
        this.props.nodes.length * 200000 + this.props.assets.length * 500000;
      const percentage = (100 - ((globalEconomicResult * 100) / oldEconomicResult)).toFixed(2);
      yieldMessage = 'Reddito dopo analisi: €' +
        Number(globalEconomicResult.toFixed(2)).toLocaleString()
        + '. Reddito originale: € ' +
        Number(oldEconomicResult.toFixed(2)).toLocaleString() + '. ';
      percentageMessage = 'Diminuzione pari al: ' + percentage + '%';
      // yieldMessage = 'Il reddito è di: ' + oldEconomicResult;
    }
    return (
      <div>
      <Paper
        style = {{ width: '250px', padding: '24' }}
      >
        <p
          style = {{ color: '#444444', marginTop: '0' }}
        >
          {yieldMessage} {percentageMessage !== null ? percentageMessage : ''}
        </p>
          <RaisedButton
            primary = {true}
            label = "Mostra legenda"
            onClick = {this.onLegendaOpenClick}
          />
      </Paper>
      <LegendaDialog
        legendaVisibility = {this.state.legendaVisibility}
        onClose = {this.onLegendaCloseClick}
      />
    </div>
    );
  }

  public componentWillUnmount() {
    this.onLegendaCloseClick();
  }

  private onLegendaOpenClick() {
    this.setState({
      legendaVisibility: true,
    });
  }

  private onLegendaCloseClick() {
    this.setState({
      legendaVisibility: false,
    });
  }
}

export default connect<MessageWrapperStateToPropsInterface, null,
  MessageWrapperOwnPropsInterface>(mapStateToMessageWrapperProps, null)(MessageWrapper);
