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

import { parseTime } from '../Lib.jsx';

/* Apollo */
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';

/* Recompose */
import { compose, lifecycle, withState, withProps, withHandlers, withStateHandlers } from 'recompose';

import { AlertDialog } from '../dialogs/Dialogs.jsx';

const searchstyle = {
  position: 'relative',
  height: '900px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'transparent',
  borderRadius: '13px',
  backgroundColor: 'rgba(0, 62, 126, 0.1)',
  width: 300,
  margin: 10,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginBottom: '50px'
};

const SearchResultLabel = (props) => {
  return (
    <div className="p-container-style-search">
      <div className="p-container-style-title">
        {props.title} 
      </div>
      <div className="p-div-style-search">{props.body}</div>
    </div>
  );
};



/* For date new Date(val.startDate).toLocaleDateString() */
const LeftPanel = (props) => {

  props.handleGradientHide();
  return (
    <div>
        <div className="search-column">
          <div style={{width: '100%'}}>
            <Typography variant="title" color="inherit" className="big-blue-typography-label-classes">
              Add Classes:
            </Typography>
          </div>
          <SemestersField {...props} />
          <div className={"scroll-gradient" + props.showGradient}>
          </div>
          <div className="search-column-scroll-area">
            {
              props.classes.length > 0 ? props.classes.map((val, idx) => {
                  props.handleGradientShow();
                  return <div className="search-column-result-component" key={val.id}>
                      <SearchResultLabel title="Title: " body={val.title} />
                      {val.room == null ? 'NA' : <SearchResultLabel title="Room: " body={val.building + " " + val.room} /> }
                      {val.days.length == 0 ? '' : <SearchResultLabel title="Days: " body={val.days} />}
                      <SearchResultLabel title="When: " body={parseTime(val.beginTime) + " - " + parseTime(val.endTime)} />
                      <SearchResultLabel title="Subject: " body={val.subject + " " + val.course + ":" + val.section} />
                      <Button 
                        type="Raised" 
                        style ={{
                          marginTop: 'auto',
                          float: 'right',
                          color: '#ffd200',
                        }} 
                        onClick={
                          (e) => {
                              console.log("Registered Class.");
                              console.log({
                                title: val.title,
                                room: val.building + " " + val.room,
                                section: val.section,
                                days: val.days, 
                                start: val.beginTime, /* TODO: Filter this from an int to actual time value */
                                end: val.endTime,
                                subject: val.subject + " " + val.course + ":" + val.section,
                                term: val.term,                       
                                course: val.course,           
                                linkId: val.linkId,          
                                crn: val.crn,         
                                minCredits: val.minCredits,         
                                maxCredits: val.maxCredits,
                                instructorFirstName: val.instructorFirstName,
                                instructorLastName: val.instructorLastName,
                                actualEnrollment: val.actualEnrollment,
                                maximumEnrollment: val.maximumEnrollment,
                                seatsAvailable: val.seatsAvailable,
                                meetingTimeCount: val.meetingTimeCount,
                                scheduleType: val.scheduleType
                              });
                              props.updateClassesHandler({
                                title: val.title,
                                room: val.building + " " + val.room,
                                section: val.section,
                                days: val.days, 
                                start: val.beginTime, /* TODO: Filter this from an int to actual time value */
                                end: val.endTime,
                                subject: val.subject + " " + val.course + ":" + val.section,
                                term: val.term,         
                                course: val.course,           
                                linkId: val.linkId,          
                                crn: val.crn,         
                                minCredits: val.minCredits,         
                                maxCredits: val.maxCredits,
                                instructorFirstName: val.instructorFirstName,
                                instructorLastName: val.instructorLastName,
                                actualEnrollment: val.actualEnrollment,
                                maximumEnrollment: val.maximumEnrollment,
                                seatsAvailable: val.seatsAvailable,
                                meetingTimeCount: val.meetingTimeCount,
                                scheduleType: val.scheduleType
                              });
                          }
                        }>Schedule</Button>
                  </div>
              }) :<div><p>{props.searchClassesStateText}</p></div>

            }
          </div>

          
          <AlertDialog {...props} />
        </div>
    </div>
  );
};

/*
<Button 
            variant="raised"
            size="small" 
            onClick={(e) => {
              console.log(props);

              console.log(StateData);
              props.get_subjects_by_tsc.refetch({ 
                semester: StateData.semester,
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
              backgroundColor: '#0F3e7e', 
              margin: '10px 10px 10px 10px',
              color: '#ffd200',
              display: 'flex', 
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
          Search
          </Button>

*/

const SearchClassesBase = compose(
  graphql(gql`
    query SearchClassesGetSubjectsSearchButtonByTermDeptCourse (
      $semester: String!, 
      $department: String!, 
      $course: String!
    ){
      getSubjectsByTermDepartmentCourse(
        semester: $semester,
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
        semester: StateData.semester,
        department: StateData.department,
        course: StateData.course,
      }
    }
  }),
  withState('expanded', 'handleExpansionPanel', null),
  withStateHandlers(
    { /* State */
      searchClassesStateText: 'Please Search For A Class.',
      showGradient: ' hide-gradient',
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
      handleClearClasses: props => event => {
        return {
          classes: []
        }
      },
      handleLoadingStateText: props => event => {
        return {
          searchClassesStateText: 'Loading...'
        }
      },
      handleDepartmentStateText: props => event => {
        return {
          searchClassesStateText: 'Please Select A Department.'
        }
      },
      handleCourseStateText: props => event => {
        return {
          searchClassesStateText: 'Please Select A Course.'
        }
      },
      handleResetStateText: props => event => {
        return {
          searchClassesStateText: 'Please Select A Semester.'
        }
      },
      handleGradientHide: props => event => {
        return {
          showGradient: ' hide-gradient'
        }
      },
      handleGradientShow: props => event => {
        return {
          showGradient: ' show-gradient' 
        }
      },
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