import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ScheduleCard from './ScheduleCard.jsx';
import Typography from 'material-ui/Typography';

const Parameters = {
	columnWidth: '200px',
	columnHeight: '100px',
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
const Times = [
	"5:00 AM",
	"7:00 AM",
	"9:00 AM",
	"11:00 AM",
	"1:00 PM",
	"3:00 PM",
	"5:00 PM",
	"7:00 PM",
	"9:00 PM",
	"Other"
];

const ScheduleComponent = (props) => {
	return (
		<div style={{
			width: Parameters.columnWidth, 
			height: '100px',
			marginBottom: '5px',
			backgroundColor: '#414141', 
			margin: '10px 10px 15px 10px'
		}}>
			{
				props.classes.map((course, index) => {
					return course.days.map((day) => {
						if (day == props.value) {
							console.log("WE HIT IT LAD WEW");
							return <ScheduleCard course={course} />
						}
					})
					
				})	
			}
	</div>);
};


const CalendarTimeColumn = (props) => { 
	const { title } = props;
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '800px'
		}}>
			<div style={{
				width: '150px',
				height: '20px',
				backgroundColor: '#003e7e',
				margin: '10px 10px 10px 10px'
			}}>
				<Typography style={{
					alignItems: 'center', 
					display: 'flex', 
					justifyContent: 'center',
					color: '#ffd200'
				}}>{title}</Typography>
			</div>


			{Times.map((val, idx) => {
				return <Typography 
					key={idx}
					style={{
						alignItems: 'center', 
						display: 'flex', 
						height: '100px',

						borderRight: '2px solid #333',
						borderBottom: '2px solid #333',
						marginBottom: '5px',

						// borderRadius: '0px 2px 2px 0px',
						// border: 'solid #AAA',
						// background: '#AAA',
						justifyContent: 'center',
						color: '#CCC'
					}}>
						{val}
					</Typography>
			})}

		</div>
	);
};

const InnerDivs = (props) => {
	for (var i = 0; i < 9; i++) {
		return <div key={i * i + 3000} style={{
			alignItems: 'center', 
			display: 'flex', 
			height: '100px',
			borderRight: '2px solid #333',
			borderBottom: '2px solid #333',
			marginBottom: '5px',
			justifyContent: 'center',
			color: '#CCC'
		}}></div>
	}
}

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
				height: '20px', 
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
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
			<ScheduleComponent {...props} />
		</div>
	);
}

const DisplayCalendar = (props) => {
	return (
		<div style={{display: 'flex'}}>
			<CalendarTimeColumn title="Time" {...props} />
			<CalendarColumn title="Monday" value="M" {...props} />
			<CalendarColumn title="Tuesday" value="T" {...props} />
			<CalendarColumn title="Wednesday" value="W" {...props} />
			<CalendarColumn title="Thursday" value="R" {...props} />
			<CalendarColumn title="Friday" value="F" {...props} />
		</div>
	);
}

export default DisplayCalendar;
