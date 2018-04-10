/* React Specific Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* Material UI Dialog Imports */
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import { parseTime } from '../Lib.jsx';

export const AlertDialog = (props) => {
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


/*
id:                 
term:               
subject:            
course:             
section:            
linkId:             
crn:                
title:              
minCredits:         
maxCredits:         
instructorFirstName:
instructorLastName: 
actualEnrollment:   
maximumEnrollment:  
seatsAvailable:     
meetingTimeCount:   
scheduleType:       
building:           
room:               
beginTime:          
endTime:
*/


export const DetailsDialog = (props) => {

  const { detailData, course, detailsOpen, handleDetailsClose } = props;


  console.log(props);
  return (
    <Dialog
      open={detailsOpen}
      onClose={handleDetailsClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{course.title}<br/>{course.subject}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Time: {parseTime(course.start) + " - " + parseTime(course.end)}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          Room: {course.room}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          Seats Available: {course.seatsAvailable}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          CRN: {course.crn}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDetailsClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};





























