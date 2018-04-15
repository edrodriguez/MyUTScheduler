import uuid from 'uuid';
import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { 
	ScheduleCard, 
	PlaceholderCard, 
	ExtracurricularCard,
	PlaceholderCounts,
} from '../calendar_cards/CalendarCards.jsx';

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


const getCalendarStateIndex = (day, time) => {
	var timeIndex = 0;
	var dayIndex = 0;
	if (day == "M") { dayIndex = 0; }
	if (day == "T") { dayIndex = 1; }
	if (day == "W") { dayIndex = 2; }
	if (day == "R") { dayIndex = 3; }
	if (day == "F") { dayIndex = 4; }



	if (time == "8:00 AM") { timeIndex = 0 }
	if (time == "9:00 AM") { timeIndex = 1 } 
	if (time == "10:00 AM") { timeIndex = 2 }
	if (time == "11:00 AM") { timeIndex = 3 }
	if (time == "12:00 PM") { timeIndex = 4 }
	if (time == "1:00 PM") { timeIndex = 5 } 
	if (time == "2:00 PM") { timeIndex = 6 } 
	if (time == "3:00 PM") { timeIndex = 7 } 
	if (time == "4:00 PM") { timeIndex = 8 } 
	if (time == "5:00 PM") { timeIndex = 9 } 
	if (time == "6:00 PM") { timeIndex = 10 } 
	if (time == "7:00 PM") { timeIndex = 11 } 
	if (time == "8:00 PM") { timeIndex = 12 } 
	if (time == "9:00 PM") { timeIndex = 13 } 

	return {day: dayIndex, time: timeIndex};
}

const CalendarStateMatrix = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
]

const substring = (val) => {
	const str = val.slice(0, -2);
	return str;
};

const IndexToTime = {
	"1": "8:00 AM", 
	"2": "8:00 AM", 
	"3": "8:00 AM", 
	"4": "8:00 AM", 
	"5": "8:00 AM", 
	"6": "8:00 AM",
	"7": "8:00 AM", 	
	"8": "8:00 AM", 
	"9": "9:00 AM", 	
	"10": "10:00 AM", 
	"11": "11:00 AM", 	
	"12": "12:00 PM",
	"13": "1:00 PM", 	
	"14": "2:00 PM", 
	"15": "3:00 PM", 	
	"16": "4:00 PM",
	"17": "5:00 PM", 	
	"18": "6:00 PM",
	"19": "7:00 PM", 	
	"20": "8:00 PM", 
	"21": "9:00 PM", 
	"22": "Other", 
	"23": "Other", 
	"24": "Other"
};

const phData = {
	placeholder: null
};

class ScheduleComponent extends Component {
	constructor(props) {
		super(props);

		this.addPlaceholder = this.addPlaceholder.bind(this);
		this.removePlaceholder = this.removePlaceholder.bind(this);
	}

	removePlaceholder(phValue) {
		console.log("Removing Placeholder");
		phData.placeholder = null;
	}

	addPlaceholder(phValue) {
		console.log("UPDATING PLACEHOLDER");
		phData.placeholder = phValue;
	}

	componentDidMount() {
		console.log("Component Mounted");
	}

	componentWillUpdate() {
		// console.log("Component Will Update.");
		// console.log(this.props);
		// console.log(this.props.classes);
		// console.log(this.props.value);
		// console.log(this.props.timeSlot);
		this.props.classes.map((course) => {
			if (!(course.days.includes(this.props.value))) {
				this.addPlaceholder(this.props.timeSlot);
			}
		});
	}

	componentDidUpdate() {
		// console.log("Component Did Update.");
	}

	render() {
		console.log("Render Called.");
		const { timeSlot, activities } = this.props;
		var holderClassName = "schedule-component-slot";
		if (this.props.title == "Monday") {
			if (this.props.am) {
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

		// MAKE PLACEHOLDERS COLLAPSE WIDTH WISE AND CLASS CARDS GROW COLUMN WISE

		return (<div className={holderClassName}>
			{
				activities.map((activity, index) => {
					// console.log("Got Activity: ");
					// console.log(activity);
					const i = substring(activity.startTime + "") + "";
					// console.log(i);
					let x = IndexToTime[i];
					// console.log("X: ", x, "Index: ", timeSlot);
					
					if (timeSlot == x) {
						if (activity.day == this.props.value) {
							
							return <ExtracurricularCard key={uuid()} extracurricular={activity} />
						} 
						// else if (timeSlot == phData.placeholder){
						// 	console.log("ACTIVITIES TIMESLOT MATCHED PLACEHOLDER: ", timeSlot);
						// 	return <PlaceholderCard />
						// }					
					}
				})
			}

			{
				this.props.classes.map((course, index) => {
					const i = substring(course.start + "") + "";
					let x = IndexToTime[i];					
					if (timeSlot == x) {
						return course.days.map((day) => {
							if (day == this.props.value) {
								PlaceholderCounts[day] = false;
								console.log("New PlaceholderCounts: ", PlaceholderCounts);
								return <ScheduleCard key={uuid()} course={course} />	
							} else {
								return <PlaceholderCard key={uuid()} />
							}
						})
						
					} else {
						if (timeSlot == "Other" && course.room == "OC DL ONLINE") {
							return <ScheduleCard key={uuid()} course={course} />
						}
					}
				})	
			}
		</div>);
	}

}

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

class CalendarColumn extends Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<div className="calendar-column">
				<div className="calendar-column-header">
					<Typography className="calendar-column-header-typography">{this.props.title}</Typography>
				</div>

				<ScheduleComponent timeSlot={"8:00 AM" } am={true} {...this.props} />
				<ScheduleComponent timeSlot={"9:00 AM" } am={true} {...this.props} />
				<ScheduleComponent timeSlot={"10:00 AM"} am={true} {...this.props} />
				<ScheduleComponent timeSlot={"11:00 AM"} am={true} {...this.props} />
				<ScheduleComponent timeSlot={"12:00 PM"} am={false} {...this.props} />
				<ScheduleComponent timeSlot={"1:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"2:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"3:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"4:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"5:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"6:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"7:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"8:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot={"9:00 PM" } am={false} {...this.props} />
				<ScheduleComponent timeSlot="Other" am={false} {...this.props} />
			</div>
		);
	}
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
