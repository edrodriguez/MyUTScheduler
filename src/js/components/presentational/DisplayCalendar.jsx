import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ScheduleCard from './ScheduleCard.jsx';
import Typography from 'material-ui/Typography';

const Parameters = {
	columnWidth: '200px',
	columnHeight: '100%',
	columnMinHeight: '140px'
};

/*
title
room
section
days
start
end
subject
*/

const CalendarColumn = (props) => {
	return (

		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '800px'
		}}>
		{props.classes ? console.log("WEWDYDOO") : ''}
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
					props.classes.map((course, index) => {
						return course.days.map((day) => {
							if (day == props.value) {
								console.log("WE HIT IT LAD WEW");
								return <ScheduleCard 
									show 
									title={course.title} 
									subject={course.subject} 
									number={course.room} 
								/>
							}
						})
						
					})	
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

const DisplayCalendar = (props) => {
	return (
		<div style={{display: 'flex'}}>
			<CalendarColumn title="Monday" value="M" {...props}/>
			<CalendarColumn title="Tuesday" value="T" {...props}/>
			<CalendarColumn title="Wednesday" value="W" {...props}/>
			<CalendarColumn title="Thursday" value="TR" {...props}/>
			<CalendarColumn title="Friday" value="F" {...props}/>
		</div>
	);
}

export default DisplayCalendar;
