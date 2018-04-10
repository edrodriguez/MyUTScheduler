import React, { Component } from "react";
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';

import Select from 'react-select';

import 'react-select/dist/react-select.css';

const styles = theme => ({
	container: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  formControl: {
	    margin: theme.spacing.unit,
	  },
	  inputLabelFocused: {
	    color: purple[500],
	  },
	  inputUnderline: {
	    '&:after': {
	      backgroundColor: purple[500],
	    },
	  },
	  textFieldRoot: {
	    padding: 0,
	    'label + &': {
	      marginTop: theme.spacing.unit * 4,
	    },
	  },
	  textFieldInput: {
	    borderRadius: 4,
	    backgroundColor: theme.palette.common.white,
	    border: '1px solid #ced4da',
	    fontSize: 16,
	    padding: '10px 12px',
	    width: 'calc(100% - 24px)',
	    transition: theme.transitions.create(['border-color', 'box-shadow']),
	    '&:focus': {
	      borderColor: '#80bdff',
	      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	    },
	  },
	  textFieldFormLabel: {
	    fontSize: '1.3125rem',
		fontWeight: '500',
		lineHeight: '1.16667em'
	  },
});

const Days = [
	{ value: "M", label: "Monday" },
	{ value: "T", label: "Tuesday" },
	{ value: "W", label: "Wednesday" },
	{ value: "R", label: "Thursday" },
	{ value: "F", label: "Friday" }
];

const AvailableTimes = [
	{ value: 500, label: "5:00 AM" }, 	
	{ value: 515, label: "5:15 AM" },
	{ value: 530, label: "5:30 AM" },
	{ value: 545, label: "5:45 AM" },
	{ value: 600, label: "6:00 AM" },	
	{ value: 615, label: "6:15 AM" },	
	{ value: 630, label: "6:30 AM" },	
	{ value: 645, label: "6:45 AM" },	
	{ value: 700, label: "7:00 AM" }, 	
	{ value: 715, label: "7:15 AM" },		
	{ value: 730, label: "7:30 AM" },	
	{ value: 745, label: "7:45 AM" },	
	{ value: 800, label: "8:00 AM" }, 	
	{ value: 815, label: "8:15 AM" },
	{ value: 830, label: "8:30 AM" }, 
	{ value: 845, label: "8:45 AM" }, 
	{ value: 900, label: "9:00 AM" },	
	{ value: 915, label: "9:15 AM" }, 
	{ value: 930, label: "9:30 AM" }, 	
	{ value: 945, label: "9:45 AM" }, 
	{ value: 1000, label: "10:00 AM" }, 	
	{ value: 1015, label: "10:15 AM" }, 	
	{ value: 1030, label: "10:30 AM" }, 	
	{ value: 1045, label: "10:45 AM" }, 
	{ value: 1100, label: "11:00 AM" },
	{ value: 1115, label: "11:15 AM" }, 	
	{ value: 1130, label: "11:30 AM" }, 
	{ value: 1145, label: "11:45 AM" }, 
	{ value: 1200, label: "12:00 PM" }, 	
	{ value: 1215, label: "12:15 PM" }, 	
	{ value: 1230, label: "12:30 PM" }, 	
	{ value: 1245, label: "12:45 PM" }, 
	{ value: 1300, label: "1:00 PM" }, 
	{ value: 1315, label: "1:15 PM" }, 	
	{ value: 1330, label: "1:30 PM" }, 
	{ value: 1345, label: "1:45 PM" }, 
	{ value: 1400, label: "2:00 PM" }, 
	{ value: 1415, label: "2:15 PM" }, 
	{ value: 1430, label: "2:30 PM" }, 
	{ value: 1445, label: "2:45 PM" }, 
	{ value: 1500, label: "3:00 PM" }, 
	{ value: 1515, label: "3:15 PM" }, 
	{ value: 1530, label: "3:30 PM" }, 
	{ value: 1545, label: "3:45 PM" }
];

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

const ExtracurricularSelect = (props) => {

	const {selectValue, onValueChange, options, style, placeholder } = props;

	return (
		<Select
          id="state-select"
          ref={(ref) => { 
            {/*props.updateRefToSelect(ref);*/}
          }}
          style={style}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus
          options={options}
          simpleValue
          clearable={true}
          placeholder={placeholder}
          name="selected-state"
          disabled={false}
          value={selectValue}
          onChange={(value) => { onValueChange(value); }}
          rtl={false}
          searchable={true}
        />
	);
};


class Extracurricular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: '',
			description: '',
			startTime: '',
			endTime: '',
			day: ''
		};
	}

	render() {
		const { classes, updateActivitiesHandler } = this.props;
		return (
			<div className="extracurricular-row-container">
				<div className="extracurricular-row-container-paper">
			        <div className="extracurricular-row-container-flexbox">
				        <div className="extracurricular-activities-leading-column">
				        	<Typography variant="title" color="inherit" className="big-blue-typography-label">
					            Add Extracurricular Activities:
					        </Typography>


					        <ExtracurricularSelect 
					        	selectValue={this.state.selectValue} 
					        	options={Activities}
					        	style={{
						          	width: '300px',
						        }}
						        placeholder="Work, Meeting, etc."
					        	onValueChange={
					        		(newValue) => {
						          		console.log("Updated State: {selectValue: " + newValue + "}");
						          		this.setState({selectValue: newValue});
						          	}
						        }
						    />
					     
				        </div>
				    
				    <div style={{width: '360px'}}>
				        <TextField
				        	style={{margin: "10px 10px 10px 10px"}}
					        defaultValue=""
					        label="Description"
					        id="bootstrap-input"
					        onChange={
					        	(input) => {
					        		console.log(input.target.value);
					        		console.log("Updated State: {description: " + input.target.value + "}");
					        		this.setState({description: input.target.value});
					        	}
					        }
					        InputProps={{
					          disableUnderline: true,
					          classes: {
					            root: classes.textFieldRoot,
					            input: classes.textFieldInput,
					          },
					        }}
					        InputLabelProps={{
					          shrink: true,
					          className: classes.textFieldFormLabel,
					        }}
					      />
					</div>
					<div style={{width: '110px', margin: '45px 5px 0px 5px'}}>
					      <ExtracurricularSelect 
					        	selectValue={this.state.day} 
					        	options={Days}
						        placeholder="Day"
					        	onValueChange={
					        		(newValue) => {
						          		console.log("Updated State: {startTime: " + newValue + "}");
						          		this.setState({day: newValue});
					          		}
						        }
						  />
					</div>
					<div style={{width: '250px', margin: '45px 5px 0px 5px'}}>
					      <ExtracurricularSelect 
					        	selectValue={this.state.startTime} 
					        	options={AvailableTimes}
						        placeholder="Start Time"
					        	onValueChange={
					        		(newValue) => {
						          		console.log("Updated State: {startTime: " + newValue + "}");
						          		this.setState({startTime: newValue});
					          		}
						        }
						  />
					</div>
					<div style={{width: '250px', margin: '45px 5px 0px 5px'}}>
						  <ExtracurricularSelect 
					        	selectValue={this.state.endTime} 
					        	options={AvailableTimes}
					        	placeholder="End Time"
					        	onValueChange={
					        		(newValue) => {
						          		console.log("Updated State: {endTime: " + newValue + "}");
						          		this.setState({endTime: newValue});
						          	}
						        }
						  />
					</div>
					      <div style={{
					      	height: '50px',
					    	float: 'right',

					    	margin: '45px 10px 10px 10px'
					      }}>
						    <Button 
						    	variant="raised" 
						    	style={{
							    	backgroundColor: '#0F3e7e', 
							    	color: '#ffd200',
							    }}
							    onClick={
							    	(e) => {
							    		console.log(
							    			"Updating Activities: { title: " + 
							    			this.state.selectValue + 
							    			", description: " + 
							    			this.state.description + 
							    			", startTime: " +
							    			this.state.startTime +
							    			", endTime: " + 
							    			this.state.endTime +
							    			", day: " +
							    			this.state.day +
							    			" }"
							    		);
							    		updateActivitiesHandler({
							    			title: this.state.selectValue,
							    			description: this.state.description,
							    			startTime: this.state.startTime,
							    			endTime: this.state.endTime,
							    			day: this.state.day
							    		});
							    	}
							    }
							>
						        Schedule
						    </Button>
					    </div>
			        </div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Extracurricular);