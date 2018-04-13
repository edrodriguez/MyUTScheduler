/* Material UI Imports */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

import { createMuiTheme } from 'material-ui/styles';
import indigo900 from 'material-ui/colors/indigo';

/* React Specific Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

export default class PageHeader extends Component {
  state = {
      left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <div>
        <AppBar position="static" avatar={<img src="./download.png" />} style={{backgroundColor: '#003e7e', fontSize: '1.6rem'}}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{color: '#ffd200'}}>
              MyUT Scheduler
            </Typography>
          </Toolbar>
        </AppBar>
       </div>
    );
  }
};
