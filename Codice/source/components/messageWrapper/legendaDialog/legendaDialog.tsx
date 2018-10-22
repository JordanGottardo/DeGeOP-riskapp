import * as React from 'react';
import { LegendaDialogPropsInterface } from './legendaDialogInterface';
import {
  Chip,
  Dialog, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn,
  Avatar, RaisedButton,
} from 'material-ui';
import {
  amber500, deepOrange500, green500, indigo500, lightGreen500, lime500, orange500, pink500, red500,
  yellow500,
} from 'material-ui/styles/colors';

export class LegendaDialog extends React.Component<LegendaDialogPropsInterface, null> {
  constructor(props: LegendaDialogPropsInterface) {
    super(props);
  }

  public render() {
    const actions = [
      (
        <RaisedButton
          key = "1"
          primary = {true}
          label = "Nascondi legenda"
          onClick = {this.props.onClose}
        />
      ),
    ];
    if (!this.props.legendaVisibility) {
      return null;
    }

    return (
    <Dialog
      title = "Legenda dei colori dei nodi"
      actions = {actions}
      modal = {false}
      open = {this.props.legendaVisibility}
      onRequestClose = {this.props.onClose}
      contentStyle = {{ maxWidth: '400px' }}
    >
      <Chip style = {{ marginTop: '4px' }}>
        <Avatar size = {32} color = {indigo500} backgroundColor = {indigo500}>
          MB
        </Avatar>
        Nessuna variazione del reddito
      </Chip>
      <Chip style = {{ marginTop: '4px' }}>
        <Avatar size = {32} color = {green500} backgroundColor = {green500}>
          MB
        </Avatar>
        Diminuzione del reddito tra  1% e 50%
      </Chip>

      <Chip style = {{ marginTop: '4px' }}>
        <Avatar size = {32} color = {yellow500} backgroundColor = {yellow500}>
          MB
        </Avatar>
        Diminuzione del reddito tra  51% e 100%
      </Chip>
      <Chip style = {{ marginTop: '4px' }}>
        <Avatar size = {32} color = {orange500} backgroundColor = {orange500}>
          MB
        </Avatar>
        Diminuzione del reddito tra 101% e 150%
      </Chip>
      <Chip style = {{ marginTop: '4px' }}>
        <Avatar size = {32} color = {red500} backgroundColor = {red500}>
          MB
        </Avatar>
        Diminuzione del reddito tra 151% e 200%
      </Chip>
      <Chip style = {{ marginTop: '4px' }}>
        <Avatar size = {32} color = {pink500} backgroundColor = {pink500}>
          MB
        </Avatar>
        Diminuzione del reddito maggiore del 200%
      </Chip>
    </Dialog>
    );
  }
}
