import uuid from 'uuid';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

import { parseTime } from '../Lib.jsx';
import { DetailsDialog } from '../dialogs/Dialogs.jsx';

const SearchResultLabel = (props) => {
  return (
    <div className="p-container-style-search">
      <div className="p-container-style-title">
        {props.title}
      </div>
      <div className="p-div-style-search">
        { props.subBody ? <div>{props.body}<br />{props.subBody}</div> : <div>{props.body}</div> }
      </div>
    </div>
  );
};

/*
title: this.state.selectValue,
description: this.state.description,
startTime: this.state.startTime,
endTime: this.state.endTime
*/

export class ExtracurricularCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsOpen: false
    }
    this.handleDetailsClose = this.handleDetailsClose.bind(this);
    this.handleDetailsOpen = this.handleDetailsOpen.bind(this);
  }

  handleDetailsOpen() {
    this.setState({detailsOpen: true}); 
  }
  handleDetailsClose() {
   this.setState({detailsOpen: false}); 
  }

  render() {
    const { extracurricular } = this.props;
    return (
      <div className="schedule-card" style={{display: 'flex', flexDirection: 'column'}}key={uuid()}>
       
          <SearchResultLabel title="Activity: " body={extracurricular.title} />
          <SearchResultLabel title="When: " body={parseTime(extracurricular.startTime) + " - " + parseTime(extracurricular.endTime)} />

      </div>
    );
  }
}

export class ScheduleCard extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      detailsOpen: false
    }
    this.handleDetailsClose = this.handleDetailsClose.bind(this);
    this.handleDetailsOpen = this.handleDetailsOpen.bind(this);
  }

  handleDetailsOpen() {
    this.setState({detailsOpen: true}); 
  }
  handleDetailsClose() {
   this.setState({detailsOpen: false}); 
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { course } = this.props;
    return (
      <div className="schedule-card" key={course.id}>
        <SearchResultLabel
          title="Class: "
          body={course.title}
          subBody={course.subject}
        />
        <SearchResultLabel 
          title="When: " 
          body={parseTime(course.start) + " - " + parseTime(course.end)} 
        />
        <Button 
          type="Raised"
          size="small" 
          style ={{
            marginTop: 'auto',
            float: 'right',
            color: '#FAFA0A',
          }} 
          onClick={(e) => {
            this.handleDetailsOpen();
          }}
         >Details</Button>

         <DetailsDialog 
            detailsOpen={this.state.detailsOpen}
            handleDetailsClose={this.handleDetailsClose}
            {...this.props} 
         />
      </div>


    );
  }
}