/* React Specific Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* Material UI Imports */
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import GridList, { GridListTile } from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';

import SemestersField, { StateData } from './SelectMultipleDropDown.jsx';

/* We want to update this with the final search */
import { calendarData } from '../../SchedulerGlobals.jsx';


import { parseTime } from '../Lib.jsx';

/* Apollo */
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

/* Recompose */
import { compose, lifecycle, withState, withProps, withHandlers, withStateHandlers } from 'recompose';


const AlertDialog = (props) => {
  return (
    <Dialog
      open={props.dialogOpen}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Oops!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please select Semester, Department, and Course to search for the classes you need.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const uuidv4 = () => { /* Generates RFC4122 Compliant UUID */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g, 
        (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }
    );
};

const searchstyle = {
  height: '800px',
  width: 300,
  margin: 10,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginBottom: '50px'
};

const pContainerStyle = {
  textAlign: 'left', 
  display: 'flex',
  color: '#CCC',
  fontSize: '10pt'
};

const pDivStyle = {
  display: 'flex', 
  color: '#FFF',
  width: '230px',
  fontSize: '9pt',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const SearchResultLabel = (props) => {
  return (
    <div style={pContainerStyle}>
      <div style={{
        width: '60px', 
        marginRight: '10px',
        fontSize: '9pt',
        paddingLeft: '5px'
      }}>
      {props.title} 
      </div>
      <div style={pDivStyle}>{props.body}</div>
    </div>
  );
};



/* For date new Date(val.startDate).toLocaleDateString() */
const LeftPanel = (props) => {
  return (
    <div>
        <Paper style={searchstyle} zDepth={2}>
          <SemestersField />
          <div style={ 
            {
              marginTop: '50px',
              height: '500px',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              overflow: 'scroll'
            }
          }>
            {
              props.classes.length > 0 ? props.classes.map((val, idx) => {
                  return <div 
                    style={{
                      width: '280px',
                      height: '160px',
                      margin: '10px 10px 10px 10px',
                      backgroundColor: '#003e7e'
                    }}
                    key={val.id}>
                      <SearchResultLabel title="Title: " body={val.title} />
                      <SearchResultLabel title="Room: " body={val.building + " " + val.room} />
                      <SearchResultLabel title="Days: " body={val.days} />
                      <SearchResultLabel title="When: " body={parseTime(val.beginTime) + " - " + parseTime(val.endTime)} />
                      <SearchResultLabel title="Subject: " body={val.subject + " " + val.course + ":" + val.section} />
                      <Button 
                        type="Raised" 
                        style ={{
                          marginTop: 'auto',
                          float: 'right',
                          color: '#FAFA0A',
                        }} 
                        onClick={
                          (e) => {

                              /* 
                                id                
                                term               
                                subject            
                                course             
                                section            
                                linkId             
                                crn                
                                title              
                                minCredits         
                                maxCredits         
                                instructorFirstName
                                instructorLastName 
                                actualEnrollment   
                                maximumEnrollment  
                                seatsAvailable     
                                meetingTimeCount   
                                scheduleType       
                                building           
                                room               
                                beginTime          
                                endTime            
                                days 
                              */

                              console.log("Registered Class.");
                              calendarData.classes.push({
                                title: val.title,
                                room: val.building + " " + val.room,
                                section: val.section,
                                days: val.days, 
                                start: val.beginTime, /* TODO: Filter this from an int to actual time value */
                                end: val.endTime,
                                subject: val.subject + " " + val.course + ":" + val.section
                              });
                              console.log(calendarData);
                              props.updateClassesHandler(calendarData.classes);
                          }
                        }>Schedule</Button>
                  </div>
              }) :<div><p>No Classes Found.</p></div>

            }
          </div>

          <Button 
            size="small" 
            onClick={(e) => {
              console.log(props);

              console.log(StateData);
              props.get_subjects_by_tsc.refetch({ 
                term: StateData.semester,
                department: StateData.department,
                course: StateData.course, 
              }).then(obj => {
                const all = obj.data.getSubjectsByTermDepartmentCourse;
                console.log("MOST FILTERED: ", all);
                props.handleClassesUpdate(e, all);
              });

              if (StateData.semester === '' || 
                  StateData.department === '' ||
                  StateData.course === '') {
                props.handleOpen(e);
              } else {
                props.handleClose(e);
              }
            }}
            style={{
              display: 'flex', 
              alignContent: 'bottom',
              alignItems: 'center',
              marginTop: 'auto'
            }}
          >
          Search
          </Button>
          <AlertDialog {...props} />
        </Paper>
    </div>
  );
};

const SearchClassesBase = compose(
  graphql(gql`
    query SearchClassesGetSubjectsByTermDeptCourse (
      $term: String!, 
      $department: String!, 
      $course: String!
    ){
      getSubjectsByTermDepartmentCourse(
        term: $term,
        department: $department,
        course: $course) {
          id                
          term               
          subject            
          course             
          section            
          linkId             
          crn                
          title              
          minCredits         
          maxCredits         
          instructorFirstName
          instructorLastName 
          actualEnrollment   
          maximumEnrollment  
          seatsAvailable     
          meetingTimeCount   
          scheduleType       
          building           
          room               
          beginTime          
          endTime            
          days 
      }
    }
  `, {
    name: 'get_subjects_by_tsc',
    options: {
      variables: {
        term: StateData.semester,
        department: StateData.department,
        course: StateData.course,
      }
    }
  }),
  withState('expanded', 'handleExpansionPanel', null),
  withStateHandlers(
    { /* State */
      dialogOpen: false,
      classes: [],
      departments: [],
      courses: [],
      academic_period: 0,   /* 2018 */
      current_semester: 0,  /* 30 */
      department: '',       /* EECS */
      subject: '',          /* EECS */
      course_number: 0,     /* 3110 */
      section: 0,           /* 001 */
      CRN: 0,               /* 32885 */
      long_title: '',       /* Anesthesiology */
      credits: 0,           /* get from MAX_CREDITS */
      enrollment: 0,        /* SEATS_AVAILABLE  */
      building: '',         /* UTMC, OC, etc */
      begin_time: 0,        /* 24:00 hour start time */
      end_time: 0,          /* 24:00 hour end time */
      expanded_panel: null, /* For the expansion panels */
    },
    { /* State Handlers */
      handleStateUpdate: props => event => {
        console.log("Handle state update clicked.");
        
      },
      handleClassesUpdate: props => (event, classes) => {
        return {
          classes: classes
        }
      },
      handleGetDepartments: props => (event, departments) => {
        return {
          departments: departments
        }
      },
      handleGetCourses: props => (event, courses) => {
        return {
          courses: courses
        }
      },
      handleOpen: props => event => {
        console.log("Handle Open Dialog.");
        return {
          dialogOpen: true
        }
      },
      handleClose: props => event => {
        console.log("Handle Close Dialog.");
        return {
          dialogOpen: false
        }
      }
    }
  ),
  withHandlers({
    onChange: ({ handleExpansionPanel }) => event => handleExpansionPanel(
      () => event.target.value
    ),
  })
)(LeftPanel);

const SearchClasses = lifecycle({
  componentDidMount() {
    console.log("Component Did Mount: SearchClasses");
  }
})(SearchClassesBase);

export default SearchClasses;