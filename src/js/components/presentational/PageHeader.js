/* Material UI Imports */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red500,indigo900, yellowA200, darkBlack} from 'material-ui/styles/colors';

/* React Specific Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const muiTheme = getMuiTheme({
  palette: {
    backgroundColor: indigo900,
    primary1Color: indigo900,   
  },
  appBar: {
    height: 50,
  },
});

export default class PageHeader extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar
        title="MyUT Scheduler"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      </MuiThemeProvider>
    );
  }
}
