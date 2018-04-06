import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

import { parseTime } from '../Lib.jsx';


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


/*
{
	title: val.title,
	room: val.building + " " + val.room,
	section: val.section,
	days: val.days, 
	start: val.beginTime, 
	end: val.endTime,
	subject: val.subject + " " + val.course + ":" + val.section
}
*/


const ScheduleCard = (props) => {
	const { course } = props;
	return (
	    
		 <div 
            style={{
              width: '180px',
              height: '145px',
              margin: '10px 10px 10px 10px',
              backgroundColor: '#003e7e'
            }}
            key={course.id}>
              <SearchResultLabel 
              	title="Title: " body={course.title} />
              <SearchResultLabel 
              	title="Room: " body={course.room} />
              <SearchResultLabel 
              	title="Days: " body={course.days} />
              <SearchResultLabel 
              	title="When: " 
              	body={parseTime(course.start) + " - " + parseTime(course.end)} />
              <SearchResultLabel 
              	title="Subject: " 
              	body={course.subject} />
              <Button 
                type="Raised" 
                style ={{
                  marginTop: 'auto',
                  float: 'right',
                  color: '#FAFA0A',
                }} 
               >Modify</Button>
        </div>


  	);
};

export default ScheduleCard;