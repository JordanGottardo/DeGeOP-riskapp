/*
 * Author: Jordan Gottardo
 * File: source/components/snackbarWrapper/snackbarWrapper.tsx
 * Creation date: 2017-07-16
 * Last modified: 2017-08-22
 */
import * as React from 'react';
import { StoreInterface } from '../../store/types/storeInterface';
import {
  SnackbarWrapperOwnPropsInterface,
  SnackbarWrapperPropsInterface,
  SnackbarWrapperStateInterface,
  SnackbarWrapperStateToPropsInterface,
} from './snackbarWrapperInterface';
import { connect } from 'react-redux';
import { Card, CardHeader, Snackbar } from 'material-ui';

/*
 la tua componente ha in this.state un booleano open true/false
 renderizza lo snackbarMessage letto dallo store e imposta un setTimeout  che dopo snackbarDuration
    millisecondi (dello store) setti il suo state a false
 e per impostare lo state a true si può overridare componentWillReceiveProps
    che confronta il vecchio messaggio con quello nuovo, se sono diversi allora deve mostrarsi
* */

const mapStateToSnackbarWrapperProps = (state: StoreInterface):
  SnackbarWrapperStateToPropsInterface => ({
    snackbarMessage: state.reactData.snackbarMessage,
    snackbarDuration: state.reactData.snackbarDuration,
    snackbarVisibility: state.reactData.snackbarVisibility,
  });

class SnackbarWrapper extends React.Component<SnackbarWrapperPropsInterface,
  null> {

  constructor(props: SnackbarWrapperPropsInterface) {
    super(props);
    this.onSnackbarCloseHook = this.onSnackbarCloseHook.bind(this);
  }

  // public componentWillReceiveProps(nextProps: SnackbarWrapperPropsInterface,
  //                                  nextContext: any): void {
    // if (!this.state.open || this.props.snackbarMessage !== nextProps.snackbarMessage) {
    // }
    // Non dovrebbe servire, lo fa già l'onRequestClose
    // setTimeout(
    //   () => {
    //     this.setState({
    //       open: false,
    //     },
    //     );
    //   },
    //   this.props.snackbarDuration,
    // );
  // }

  public render() {
    return (
        <Snackbar
          open = {this.props.snackbarVisibility}
          message = {this.props.snackbarMessage}
          autoHideDuration = {4000}
          onRequestClose = {this.onSnackbarCloseHook}
        />
    );
  }

  private onSnackbarCloseHook() {
    this.props.emitUpdateReactData({
      snackbarVisibility: false,
    });
  }
}

export default connect<SnackbarWrapperStateToPropsInterface, any,
  SnackbarWrapperOwnPropsInterface>(mapStateToSnackbarWrapperProps)(SnackbarWrapper);
