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

const muiTheme = createMuiTheme({
  palette: {
    primary: indigo900,  
  },
  // appBar: {
  //   height: 50,
  // },
});

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class PageHeader extends Component {
 
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
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
        >
          <div>
            <Grid item xs={12}>
              <Button size="medium" >Schedule</Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" >Map</Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" >MyUT</Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" onClick={this.toggleDrawer('left', false)} >Exit</Button>
            </Grid>
          </div>
        </div>
      </Drawer>


      <AppBar position="static" style={{backgroundColor: '#003e7e'}}>
        <Toolbar>
          <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={{color: '#ffd200'}}>
            MyUT Scheduler
          </Typography>
        </Toolbar>
      </AppBar>

     </div>
    
  );
}
};

PageHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageHeader);
