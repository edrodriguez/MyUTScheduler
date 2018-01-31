/* React Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";

/* MaterialUI Imports */

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

/* Component Imports */
import Input from "../presentational/Input";
import PageHeader from "../presentational/PageHeader";
import SearchClasses from "../presentational/SearchClasses";
import DisplayCalendar from "../presentational/DisplayCalendar";

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
    const { seo_title } = this.state;
    return (
      <MuiThemeProvider>
      
      <RaisedButton label="Default" />
   
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<PageHeader />, document.getElementById("app-bar"));
ReactDOM.render(<SearchClasses />, document.getElementById("classes-search"));
ReactDOM.render(<FormContainer />, document.getElementById("create-article-form"));

export default FormContainer;