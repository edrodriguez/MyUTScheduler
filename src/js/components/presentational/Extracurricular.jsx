import React, { Component } from "react";
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Select from 'react-select';

import 'react-select/dist/react-select.css';


const Activities = [
	{ value: "Workout", label: "Workout"},
	{ value: "Work", label: "Work"},
	{ value: "Fraternity", label: "Fraternity"},
	{ value: "Sorority", label: "Sorority"},
	{ value: "Meeting", label: "Meeting"},
	{ value: "Event", label: "Event"},
	{ value: "Rally", label: "Rally"},
	{ value: "Conference", label: "Conference"}
];


export default class Extracurricular extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'row', 
				justifyContent: 'flex-start',
				alignContent: 'top',
          		alignItems: 'left',

			}}>
				<Paper style={{
					width: '100%',
					height: '80px'
				}}>
					<Typography 
						variant="title" 
						color="inherit" 
						style={{
							color: '#0F3e7e',
							margin: '10px 10px 10px 10px'
						}}>
			            Add Extracurricular Activities:
			        </Typography>

			        <Select
			          id="state-select"
			          ref={(ref) => { 
			            {/*props.updateRefToSelect(ref);*/}
			          }}
			          onBlurResetsInput={false}
			          onSelectResetsInput={false}
			          autoFocus
			          options={Activities}
			          simpleValue
			          clearable={true}
			          placeholder="Semester"
			          name="selected-state"
			          disabled={false}
			          value={''}
			          onChange={(newValue) => {
			          	console.log(newValue);
			          }}
			          rtl={false}
			          searchable={true}
			        />
				</Paper>
			</div>
		);
	}
}

