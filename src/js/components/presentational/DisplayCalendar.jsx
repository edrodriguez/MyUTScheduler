import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* Import Bootstrap Table and its CSS */
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import ScheduleCard from './ScheduleCard.jsx';
import Typography from 'material-ui/Typography';

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

const Parameters = {
	columnWidth: '200px',
	columnHeight: '100%',
	columnMinHeight: '140px'
};

const CalendarColumn = (props) => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '800px'
		}}>
			<div style={{
				width: Parameters.columnWidth, 
				height: '50px', 
				backgroundColor: '#003e7e', 
				margin: '10px 10px 10px 10px'
			}}>
				<Typography style={{
					alignItems: 'center', 
					display: 'flex', 
					justifyContent: 'center',
					color: '#ffd200'
				}}>{props.title}</Typography>
			</div>

			<div style={{
				width: Parameters.columnWidth, 
				height: Parameters.columnHeight, 
				backgroundColor: '#414141', 
				margin: '10px 10px 10px 10px'
			}}>
				{
					props.row == 1 ?
						<ScheduleCard 
							show 
							title={props.data.COURSE_TITLE} 
							subject={props.data.SUBJECT} 
							number={props.data.NUMBER} 
						/> : ''	
				}
			</div>
			<div style={{
				width: Parameters.columnWidth, 
				height: Parameters.columnHeight, 
				backgroundColor: '#414141', 
				margin: '10px 10px 10px 10px'
			}}>
				{
					props.row == 1 ?
						<ScheduleCard 
							show 
							title={props.data.COURSE_TITLE} 
							subject={props.data.SUBJECT} 
							number={props.data.NUMBER} 
						/> : ''	
				}
			</div>
			<div style={{
				width: Parameters.columnWidth, 
				height: Parameters.columnHeight, 
				backgroundColor: '#414141', 
				margin: '10px 10px 10px 10px'
			}}>
				{
					props.row == 1 ?
						<ScheduleCard 
							show 
							title={props.data.COURSE_TITLE} 
							subject={props.data.SUBJECT} 
							number={props.data.NUMBER} 
						/> : ''	
				}
			</div>
			<div style={{
				width: Parameters.columnWidth, 
				height: Parameters.columnHeight, 
				backgroundColor: '#414141', 
				margin: '10px 10px 10px 10px'
			}}>
				{
					props.row == 1 ?
						<ScheduleCard 
							show 
							title={props.data.COURSE_TITLE} 
							subject={props.data.SUBJECT} 
							number={props.data.NUMBER} 
						/> : ''	
				}
			</div>
		</div>
	);
}


export default class DisplayCalendar extends Component {
	render() {
		return (
			<div style={{display: 'flex'}}>
				<CalendarColumn 
					title="Monday"
					row={1}
					data={classes[0]}
				/>
				<CalendarColumn title="Tuesday" />
				<CalendarColumn title="Wednesday" 
					row={1}
					data={classes[0]}
				/>
				<CalendarColumn title="Thursday" />
				<CalendarColumn title="Friday" />
			</div>
		);
	}
}

/*
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
		*/

