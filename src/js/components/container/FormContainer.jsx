/* React Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* MaterialUI Imports */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

/* Component Imports */
import Input from "../presentational/Input.jsx";
import PageHeader from "../presentational/PageHeader.jsx";
import SearchClasses from "../presentational/SearchClasses.jsx";
import DisplayCalendar from "../presentational/DisplayCalendar.jsx";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    //const { seo_title } = this.state;
    return '';
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    marginTop: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const Container = (props) => {
  return (
    <Grid container className="container-grid" justify="center" >
        <Grid item xs={12} item>
          <FormContainer />
        </Grid>
        <Grid item xs={12} item>
            <DisplayCalendar />
        </Grid>
    </Grid>
  );
};

ReactDOM.render(<PageHeader />, document.getElementById("app-bar"));
ReactDOM.render(<SearchClasses />, document.getElementById("classes-search"));
ReactDOM.render(<Container />, document.getElementById("app-container"));

export default FormContainer;