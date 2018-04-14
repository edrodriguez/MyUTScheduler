import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

const Semesters = [
  { value: 'Summer 2018', label: 'Summer 2018'},
  { value: 'Fall 2018', label: 'Fall 2018'}
];

const Departments = [];
const Courses = [];

/* Recompose */
import { compose, lifecycle, withState, withProps, withHandlers, withStateHandlers } from 'recompose';

/* Apollo */
import { gql } from 'apollo-boost';
import { Query, graphql } from 'react-apollo';

export const StateData = {
  semester: '',
  department: '',
  course: ''
};

const selectStyle = {
  width: '280px',
  margin: '10px 0px 10px 0px'
};

const SemestersFieldBase = (props) => {
  const { handleClearClasses, handleLoadingStateText, handleResetStateText } = props;

  return (
      <div className="section" style={{width: '280px', margin: '0px 10px 10px 10px'}}>
        <Select
          id="state-select"
          ref={(ref) => { 
            props.updateRefToSelect(ref);
          }}
          style={selectStyle}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus
          options={Semesters}
          simpleValue
          clearable={props.clearable}
          placeholder="Semester"
          name="selected-state"
          disabled={false}
          value={props.semesterValue}
          onChange={async (newValue) => {
            StateData.semester = newValue;


            await props.get_departments.refetch({semester: newValue}).then(obj => {
              console.log(obj.data.getDepartments);

              const departments = obj.data.getDepartments; /* Load departments for the next series of boxes */
              if (departments != null) { 
                departments.map((val, idx) => {
                  Departments[idx] = {value: val, label: val};
                });
              }
              props.handleGetDepartments(newValue, Departments, true, false);
              props.updateValue({ semesterValue: newValue });

            });

            
          }}
          rtl={props.rtl}
          searchable={props.searchable}
        />
        {
          props.subjectsEnabled ? (
            <Select
              id="state-select"
              ref={(ref) => { 
                props.updateRefToSelect(ref);
              }}
              style={selectStyle}
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              autoFocus
              options={Departments}
              simpleValue
              clearable={props.clearable}
              placeholder="Department"
              name="selected-state"
              disabled={false}
              value={props.departmentValue}
              onChange={async (newValue) => {
                StateData.department = newValue;
                console.log("UPDATING VALUE: ", newValue);
                props.updateValue({ departmentValue: newValue });
                await props.get_courses.refetch({ department: newValue, semester: StateData.semester }).then(obj => {
                  console.log(obj.data.getCourses);
                  console.log("REFETCH COMPLETED");
                  const courses = obj.data.getCourses;
                  courses.map((val, idx) => {
                    Courses[idx] = { value: val, label: val };
                  });
                  props.handleGetCourses(newValue, Courses, true, true);
                  console.log(Courses);
                });
              }}
              rtl={props.rtl}
              searchable={props.searchable}
            />
          ) : ''
        }

        {
          props.coursesEnabled ? (

              <Select
                id="state-select"
                ref={(ref) => { 
                  props.updateRefToSelect(ref);
                }}
                style={selectStyle}
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                autoFocus
                options={Courses}
                simpleValue
                clearable={props.clearable}
                placeholder="Semester"
                name="selected-state"
                disabled={false}
                value={props.coursesValue}
                onChange={(newValue) => {
                  StateData.course = newValue;
                  props.updateValue({coursesValue: newValue});

                  console.log(StateData);
                }}
                rtl={props.rtl}
                searchable={props.searchable}
              />
          ) : ''
        }
        </div>
    );
};


/* V1 Keys:
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
*/  
const SemestersField = compose(
  graphql(gql`
    query SearchClassesGetSubjectsByTermDeptCourse (
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
   graphql(gql`
    query SearchClassesGetCourses ($department: String!, $semester: String!) {
      getCourses(department: $department, semester: $semester) 
    }
  `, { 
    name: 'get_courses',
    options: {
      variables: {
        department: StateData.department,
        semester: StateData.semester
      }
    }
  }),
  graphql(gql`
    query SearchClassesGetDepartments ($semester: String!) {
      getDepartments(semester: $semester)
    }
  `, { 
    name: 'get_departments',
    options: {
      variables: {
        semester: StateData.semester
      }
    }
  }),
  withStateHandlers(
    {
      subjectsEnabled: false,
      coursesEnabled: false,
      searchable: true,
      clearable: true,
      rtl: false,
      semesterValue: '',
      departmentValue: '',
      coursesValue: '',
      select: null,
      departments: [],
      courses: [],
    },
    {
      updateRefToSelect: props => ref => {
        return {
          select: ref
        }
      },
      clearValue: props => event => {
        // this.select.setInputValue('');
      },
      updateValue: props => newValue => {
        console.log(newValue);
        return newValue
      },
      handleGetDepartments: props => (event, departments, subjectsEnabled, coursesEnabled) => {
        return {
          subjectsEnabled: subjectsEnabled,
          coursesEnabled: coursesEnabled,
          departments: departments
        }
      },
      handleGetCourses: props => (event, courses, subjectsEnabled, coursesEnabled) => {
        return {
          subjectsEnabled: subjectsEnabled,
          coursesEnabled: coursesEnabled,
          courses: courses
        }
      },
    }
  ),
  withHandlers({
    focusStateSelect: () => {
      this.refs.stateSelect.focus();
    }
  })
)(SemestersFieldBase);

export default SemestersField;