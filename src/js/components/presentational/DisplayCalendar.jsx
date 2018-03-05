import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* Import Bootstrap Table and its CSS */
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import ScheduleCard from './ScheduleCard.jsx';

var counter = 1;

var classes = [ 
	{
		"term":1,	
		"SUBJECT":"BIOE",	
		"NUMBER":"1000",	
		"COURSE_TITLE":"Orientation And Introduction To Bioengineering",	
		"CR_HRS":"3",	
		"COURSE_REQUIREMENTS":"majors only",	
		"COURSE_TYPE":"Major Requirement",	
		"OBOR_TRANSFER_POLICY":""
	},
	{
		"term":2,	
		"SUBJECT":"BIOE",	
		"NUMBER":"1000",	
		"COURSE_TITLE":"Orientation And Introduction To Bioengineering",	
		"CR_HRS":"3",	
		"COURSE_REQUIREMENTS":"majors only",	
		"COURSE_TYPE":"Major Requirement",	
		"OBOR_TRANSFER_POLICY":""
	},
	{
		"term":3,	
		"SUBJECT":"BIOE",	
		"NUMBER":"1000",	
		"COURSE_TITLE":"Orientation And Introduction To Bioengineering",	
		"CR_HRS":"3",	
		"COURSE_REQUIREMENTS":"majors only",	
		"COURSE_TYPE":"Major Requirement",	
		"OBOR_TRANSFER_POLICY":""
	},
	{
		"term":4,	
		"SUBJECT":"BIOE",	
		"NUMBER":"1000",	
		"COURSE_TITLE":"Orientation And Introduction To Bioengineering",	
		"CR_HRS":"3",	
		"COURSE_REQUIREMENTS":"majors only",	
		"COURSE_TYPE":"Major Requirement",	
		"OBOR_TRANSFER_POLICY":""
	}
  ];

const cellFormatter = (cell, row, x) => {
	/* NOTE: We should do something like this
	 * to display the course information on our calendar
	 */

	 console.log(cell);
	 console.log(row);
	 console.log(x);

	if (row["term"] == x) {

		const info = classes[0];
		console.log(info);
		return (
			<ScheduleCard 
				show 
				title={info.COURSE_TITLE} 
				subject={info.SUBJECT} 
				number={info.NUMBER} 
			/>
		);
	} else {
		return '';
	}	
};

export default class DisplayCalendar extends Component {
	render() {
		return (
			<div>
			<BootstrapTable data={classes} striped hover>

		
				<TableHeaderColumn isKey dataField='term' dataFormat={cellFormatter} formatExtraData={1}>
					Monday
				</TableHeaderColumn>
				<TableHeaderColumn dataFormat={cellFormatter} formatExtraData={3}>Tuesday</TableHeaderColumn>
				<TableHeaderColumn dataFormat={cellFormatter} formatExtraData={3}>Wednesday</TableHeaderColumn>
				<TableHeaderColumn dataFormat={cellFormatter} formatExtraData={2}>Thursday</TableHeaderColumn>
				<TableHeaderColumn dataFormat={cellFormatter} formatExtraData={4}>Friday</TableHeaderColumn>
			</BootstrapTable>
			</div>
		);
	}
}


