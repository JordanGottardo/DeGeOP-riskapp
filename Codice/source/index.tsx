import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getMuiTheme } from 'material-ui/styles';

import App from './app';

const muiTheme = getMuiTheme({
  raisedButton: {
    primaryColor: '#B71C1C',
  },
  tabs: {
    backgroundColor: '#B71C1C',
  },
  card: {
    titleColor: '#B71C1C',
  },
  floatingActionButton: {
    color: '#B71C1C',
  },
  slider: {
    selectionColor: '#B71C1C',
  },
});
class DecoratedApp extends React.Component<{}, {}> {
  public render() {
    return (
      <MuiThemeProvider muiTheme = {muiTheme}>
        <App />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<DecoratedApp />, document.getElementById('reactcontent'));
