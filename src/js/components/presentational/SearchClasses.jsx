/* Material UI Imports */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

/* Middleware allowing exporting with styles */
import { withStyles } from 'material-ui/styles';

/* React Specific Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit,
//     align: bottom,
//   },
//   searchStyle: {
//     height: 400,
//     width: 300,
//     margin: 10,
//     textAlign: 'center',
//     display: 'inline-block',
//   },
// });

const searchstyle = {
  height: 400,
  width: 300,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};


export default class SearchClasses extends Component {
  /* Import Style Specific props */
  // const { classes } = props;


/*style={theme.searchstyle}*/ 
/* className={classes.button} */
  render() {
    return (
        <div>
          <Paper style={searchstyle} zDepth={2}>
            <p>Search classes go here</p>
            <Button size="small" >Search </Button>
          </Paper>
        </div>
    );
  }
}

// SearchClasses.propTypes = {
//   classes: PropTypes.object.isRequired;
// };

// export default SearchClasses;
// export default withStyles(styles)(SearchClasses);