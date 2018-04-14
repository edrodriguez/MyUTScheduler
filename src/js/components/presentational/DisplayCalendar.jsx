import uuid from 'uuid';
import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { ScheduleCard, ExtracurricularCard } from '../calendar_cards/CalendarCards.jsx';
import Typography from 'material-ui/Typography';

const Parameters = {
	columnWidth: '100%',
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
	const { timeSlot, activities } = props;

	var holderClassName = "schedule-component-slot";
	if (props.title == "Monday") {
		if (props.am) {
			holderClassName = "monday-component-slot-before-noon";
		} else {
			holderClassName = "monday-component-slot-after-noon";
		}
		if (timeSlot == 12) { /* Handle Noon Special */
			holderClassName = "monday-component-slot-noon";
		}
		if (timeSlot == "Other") {
			holderClassName = "monday-component-slot-other";
		}
	}

	return (
		<div className={holderClassName}>
			{
				activities.map((activity, index) => {
					console.log("Got Activity: ");
					console.log(activity);
					const i = substring(activity.startTime + "") + "";
					console.log(i);
					let x = IndexToTime[i];
					console.log("X: ", x, "Index: ", timeSlot);
					
					if (timeSlot == x) {
						if (activity.day == props.value) {
							return <ExtracurricularCard key={uuid()} extracurricular={activity} />
						}						
					}
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
								return <ScheduleCard key={uuid()} course={course} />	
							}
						})
						
					} else {
						if (timeSlot == 9 && course.room == "OC DL ONLINE") {
							return <ScheduleCard key={uuid()} course={course} />
						}
						
					}
				})	
			}
	</div>);
};

const CalendarTimeColumn = (props) => { 
	const { title } = props;
	return (
		<div className="calendar-time-column">
			<div className="calendar-time-header">
				<Typography className="calendar-time-header-typography">
					{title}
				</Typography>
			</div>
			

		</div>
	);
};


// {Times.map((val, idx) => {
// 				return (
// 					<Typography 
// 						key={idx}
// 						className="calendar-time-column-typography"
// 					>
// 						{val}
// 					</Typography>
// 				)
// 			})}

const CalendarColumn = (props) => {
	return (
		<div className="calendar-column">
			<div className="calendar-column-header">
				<Typography className="calendar-column-header-typography">{props.title}</Typography>
			</div>

			<ScheduleComponent timeSlot={8} am={true} {...props} />
			<ScheduleComponent timeSlot={9} am={true} {...props} />
			<ScheduleComponent timeSlot={10} am={true} {...props} />
			<ScheduleComponent timeSlot={11} am={true} {...props} />

			<ScheduleComponent timeSlot={12} am={false} {...props} />
			<ScheduleComponent timeSlot={1} am={false} {...props} />
			<ScheduleComponent timeSlot={2} am={false} {...props} />
			<ScheduleComponent timeSlot={3} am={false} {...props} />
			<ScheduleComponent timeSlot={4} am={false} {...props} />
			<ScheduleComponent timeSlot={5} am={false} {...props} />
			<ScheduleComponent timeSlot={6} am={false} {...props} />
			<ScheduleComponent timeSlot={7} am={false} {...props} />
			<ScheduleComponent timeSlot={8} am={false} {...props} />
			<ScheduleComponent timeSlot={9} am={false} {...props} />

			<ScheduleComponent timeSlot="Other" am={false} {...props} />
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
