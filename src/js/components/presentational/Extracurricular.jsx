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
	    fontSize: 18,
	  },
});

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

class Extracurricular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: '',
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'row', 
				justifyContent: 'flex-start',
				alignContent: 'top',
          		alignItems: 'left',
          		margin: '10px 10px 0px 10px'

			}}>
				<Paper style={{
					width: '100%',
					height: '100px',
				}}>
			        <div style={{
			        	display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-start'
			        }}>
				        <div style={{
				        	width: '300px', 
				        	margin: '10px 10px 10px 10px',
				        }}>
				        	<Typography 
								variant="title" 
								color="inherit" 
								style={{
									color: '#0F3e7e',
									margin: '0px 10px 10px 0px'
								}}>
					            Extracurricular Activities:
					        </Typography>
					        <Select
					          id="state-select"
					          ref={(ref) => { 
					            {/*props.updateRefToSelect(ref);*/}
					          }}
					          style={{
					          	width: '300px',
					          }}
					          onBlurResetsInput={false}
					          onSelectResetsInput={false}
					          autoFocus
					          options={Activities}
					          simpleValue
					          clearable={true}
					          placeholder="Work, Meeting, etc."
					          name="selected-state"
					          disabled={false}
					          value={this.state.selectValue}
					          onChange={(newValue) => {
					          	this.setState({selectValue: newValue});
					          }}
					          rtl={false}
					          searchable={true}
					        />
				        </div>
				        <TextField
				        	style={{margin: "10px 10px 10px 10px"}}
					        defaultValue=""
					        label="Description"
					        id="bootstrap-input"
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
					      <div style={{
					      	height: '50px',
					    	float: 'right',

					    	margin: '45px 10px 10px 10px'
					      }}>
						    <Button variant="raised" style={{
						    	backgroundColor: '#0F3e7e', 
						    	color: '#ffd200',
						    }}>
						        Schedule
						    </Button>
					    </div>
			        </div>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(Extracurricular);