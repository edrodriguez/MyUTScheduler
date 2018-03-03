import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* Import Bootstrap Table and its CSS */
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var classes = [
	{
      id: 1,
      name: "Class One",
      time: 120
  	}, 
  	{
      id: 2,
      name: "Class Two",
      time: 800
  	}
  ];

export default class DisplayCalendar extends Component {
	componentDidMount() {

	}
	render() {
		return (
			<div>
			<BootstrapTable data={classes} striped hover>

				<TableHeaderColumn isKey dataField='id'></TableHeaderColumn>
				<TableHeaderColumn>Monday</TableHeaderColumn>
				<TableHeaderColumn>Tuesday</TableHeaderColumn>
				<TableHeaderColumn>Wednesday</TableHeaderColumn>
				<TableHeaderColumn>Thursday</TableHeaderColumn>
				<TableHeaderColumn>Friday</TableHeaderColumn>
				<TableHeaderColumn>Saturday</TableHeaderColumn>
				<TableHeaderColumn>Sunday</TableHeaderColumn>
			</BootstrapTable>
			</div>
		);
	}
}
