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
const substring = (val) => {
	const str = val.slice(0, -2);
	return str;
};

const IndexToTime = {
	"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0,
	"7": 1, 	"8": 1, 
	"9": 2, 	"10": 2, 
	"11": 3, 	"12": 3,
	"13": 4, 	"14": 4, 
	"15": 5, 	"16": 5,
	"17": 6, 	"18":6,
	"19": 7, 	"20":7, 
	"21": 8, "22": 8, "23": 8, "24": 8
};
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
	const { timeSlot } = props;
	return (
		<div style={{
			width: Parameters.columnWidth, 
			height: '100px',
			// background: 'transparent',
			//borderRight: '2px solid #003e7e',
			// borderBottom: '2px solid #003e7e',
			backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.02)',
			// backgroundColor: '#414141', 
			margin: '5px 5px 5px 5px'
		}}>

			{
				props.activities.map((activity, index) => {
					console.log(activity);
					/* TODO: add time information to activity */
				})
			}

			{
				props.classes.map((course, index) => {
					console.log(course);
					const i = substring(course.start + "") + "";
					console.log(i);
					let x = IndexToTime[i];
					console.log("X: ", x, "Index: ", timeSlot);
					
					if (timeSlot == x) {
						return course.days.map((day) => {
							if (day == props.value) {
								console.log("WE HIT IT LAD WEW");
								return <ScheduleCard course={course} />	
							}
						})
					}
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
				width: '100px',
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
						textAlign: 'right',

						// borderRight: '2px solid #333',
						// borderBottom: '2px solid #333',
						marginBottom: '5px',
						marginRight: '10px',

						// borderRadius: '0px 2px 2px 0px',
						// border: 'solid #AAA',
						// background: '#AAA',
						justifyContent: 'right',
						color: '#BBB'
					}}>
						{val}
					</Typography>
			})}

		</div>
	);
};

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
				margin: '10px 5px 10px 5px'
			}}>
				<Typography style={{
					alignItems: 'center', 
					display: 'flex', 
					justifyContent: 'center',
					color: '#ffd200'
				}}>{props.title}</Typography>
			</div>
			<ScheduleComponent timeSlot={0} {...props} />
			<ScheduleComponent timeSlot={1} {...props} />
			<ScheduleComponent timeSlot={2} {...props} />
			<ScheduleComponent timeSlot={3} {...props} />
			<ScheduleComponent timeSlot={4} {...props} />
			<ScheduleComponent timeSlot={5} {...props} />
			<ScheduleComponent timeSlot={6} {...props} />
			<ScheduleComponent timeSlot={7} {...props} />
			<ScheduleComponent timeSlot={8} {...props} />
			<ScheduleComponent timeSlot={8} {...props} />
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
