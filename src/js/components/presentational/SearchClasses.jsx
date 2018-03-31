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

const StateData = {
  term: '',
  department: '',
  course: ''
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
/* For date new Date(val.startDate).toLocaleDateString() */
const LeftPanel = (props) => {
  return (
    <div>
        <Paper style={searchstyle} zDepth={2}>
          <ExpansionPanel
            expanded={props.expanded === 'panel1'}
            onChange={(e) => {
                console.log("ON CHANGE");
                props.handleExpansionPanel('panel1')
              }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography align="left" variant="subheading">Semester</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Typography align="left" variant="body1">
                  Pick the Semester you would like to register for:
                </Typography>
                <Chip
                  style={{margin: '10px 10px 10px 10px'}}
                  label="Spring 2018"
                  onClick={(e) => {
                    props.get_subjects_by_term.refetch({ term: 'Spring 2018' });
                    StateData.department = '';
                    StateData.course = '';
                    props.handleSemesterChipClick(e, 'Spring 2018') 
                  }}
                />
                <Chip
                  style={{margin: '10px 10px 10px 10px'}}
                  label="Summer 2018"
                  onClick={(e) => { 
                    props.get_subjects_by_term.refetch({ term: 'Summer 2018' });
                    StateData.department = '';
                    StateData.course = '';
                    props.handleSemesterChipClick(e, 'Summer 2018') 
                  }}
                />
                <Chip
                  style={{margin: '10px 10px 10px 10px'}}
                  label="Fall 2018"
                  onClick={(e) => { 
                    props.get_subjects_by_term.refetch({ term: 'Fall 2018' });
                    StateData.department = '';
                    StateData.course = '';
                    props.handleSemesterChipClick(e, 'Fall 2018') 
                  }}
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={props.expanded === 'panel2'}
            onChange={(e) => {
                console.log("ON CHANGE");
                props.handleGetDepartments(e, props.get_departments.getDepartments);
                props.handleExpansionPanel('panel2')
              }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Department</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              <div style={{
                height: '100px',
                width: '280px',
                overflow: 'scroll'
              }}>
                <GridList cellHeight={45} cols={3} style={{width: '250px'}}>
                  {
                    props.departments ? props.departments.map((tile, idx) => (
                      <GridListTile key={uuidv4()} cols={1}>
                        <Chip 
                          style={{
                            margin: '10px 10px 10px 10px',
                            width: '65px'
                          }}
                          label={tile}
                          onClick={(e) => { 
                            StateData.department = tile;
                            StateData.course = '';
                            console.log("StateData.department = ", tile);
                          }}
                        />
                      </GridListTile>
                    )) : ''
                  }
                </GridList>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={props.expanded === 'panel3'}
            onChange={
              (e) => {
                console.log("ON CHANGE");
                props.get_courses.refetch({ subject: StateData.department });
                props.handleGetCourses(e, props.get_courses.getCourses);
                props.handleExpansionPanel('panel3')
              }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Course</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{
                height: '100px',
                width: '280px',
                overflow: 'scroll'
              }}>
              <GridList cellHeight={45} cols={3} style={{width: '250px'}}>
                  {
                    props.courses ? props.courses.map((tile, idx) => (
                      <GridListTile key={uuidv4()} cols={1}>
                        <Chip 
                          style={{
                            margin: '10px 10px 10px 10px',
                            width: '65px'
                          }}
                          label={tile}
                          onClick={(e) => { 
                            StateData.course = tile;
                            console.log("StateData.course = ", tile);
                          }}
                        />
                      </GridListTile>
                    )) : ''
                  }
                </GridList>
                </div>

            </ExpansionPanelDetails>
          </ExpansionPanel>


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
              props.classes ? props.classes.map((val, idx) => {

                if (idx < 10) {
                  return <div 
                    style={{
                      width: '280px',
                      height: '100%',
                      margin: '10px 10px 10px 10px',
                      backgroundColor: '#414141'
                    }}
                    key={val.id}>
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>Title: </div>
                        <div style={pDivStyle}>{val.sectionTitle}</div>
                      </div>
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>Room: </div>
                        <div style={pDivStyle}>{val.room}</div>
                      </div>
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>Section: </div>
                        <div style={pDivStyle}>{val.section}</div>
                      </div>
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>Days: </div>
                        <div style={pDivStyle}>{val.daysMet}</div>
                      </div>
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>Start: </div>
                        <div style={pDivStyle}>{val.startTime}</div>
                      </div>
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>End: </div>
                        <div style={pDivStyle}>{val.endTime}</div>
                      </div>
                      
                      <div style={pContainerStyle}>
                        <div style={{
                          width: '60px', 
                          marginRight: '10px',
                          fontSize: '9pt'
                        }}>Subject: </div>
                        <div style={pDivStyle}>{val.subject}</div>
                      </div>
                  </div>
                }
              }) : ''
            }
          </div>

          <Button 
            size="small" 
            onClick={(e) => {
              StateData.term = props.semester ? props.semester : '';
              console.log(props);

              console.log(StateData);
              props.get_subjects_by_tsc.refetch({ 
                term: StateData.term,
                department: StateData.department,
                course: StateData.course, 
              });

              const subjects = props.get_subjects_by_term.getSubjectsByTerm;
              const departments = props.get_departments.getDepartments;
              const courses = props.get_courses.getCourses;

              const all = props.get_subjects_by_tsc.getSubjectsByTermDepartmentCourse;

              console.log("MOST FILTERED: ", all);

              
              console.log("DEPARTMENTS: ", departments);
              console.log("COURSES: ", courses)

              console.log(subjects);

              if (StateData.term === '' || 
                  StateData.department === '' ||
                  StateData.course === '') {
                props.handleOpen(e);
              } else {
                props.handleClose(e);
              }
              props.handleClassesUpdate(e, all);
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


/* All available getSubjectsByTerm values:
section       
daysMet       
startDate     
endDate
startTime
endTime
room
term           
crossList      
status         
sectionTitle   
roomNum   
roomName    
buildingName
campus 
course     
subject   
sectionNum 
instructor
courseOfferingId
sameTimeLink
*/

const SearchClassesBase = compose(
  graphql(gql`
    query SearchClassesGetCourses ($subject: String!) {
      getCourses(subject: $subject) 
    }
  `, { 
    name: 'get_courses',
    options: {
      variables: {
        subject: StateData.department
      }
    }
  }),
  graphql(gql`
    query SearchClassesGetDepartments {
      getDepartments
    }
  `, { name: 'get_departments' }
  ),
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
         section       
         daysMet       
         startDate     
         endDate
         startTime
         endTime
         room
         term           
         crossList      
         status         
         sectionTitle   
         roomNum   
         roomName    
         buildingName
         campus 
         course     
         subject   
         sectionNum 
         instructor
         courseOfferingId
         sameTimeLink
      }
    }
  `, {
    name: 'get_subjects_by_tsc',
    options: {
      variables: {
        term: StateData.term,
        department: StateData.department,
        course: StateData.course,
      }
    }
  }),
  graphql(
    gql`
      query SearchClassesGetSubjectsByTerm ($term: String!) {
        getSubjectsByTerm(term: $term) {
          id
          section       
          daysMet       
          startDate     
          endDate
          startTime
          endTime
          room    
          sectionTitle    
          buildingName
          campus 
          course     
          subject   
          sectionNum 
        }
      }
  `, {
    name: 'get_subjects_by_term',
    options: {
      variables: {
        term: StateData.term
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
      handleSemesterChipClick: props => (event, semester) => {
        console.log("Handle Semester Chip Click: ", semester);

        return {
          semester: semester /* Update the semester in the props */
        }
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

    // this.props.client.query({})

    // axios.get('http://localhost:3002/courses')
    //      .then(response => {
    //         this.obj_data = response.data.data[0];
    //         console.log(this.obj_data.ID);
            
            
    //      }
    // );


  }
})(SearchClassesBase);

export default SearchClasses;