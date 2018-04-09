/* React Imports */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* MaterialUI Imports */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

/* Component Imports */
import PageHeader from "./components/presentational/PageHeader.jsx";
import SearchClasses from "./components/presentational/SearchClasses.jsx";
import DisplayCalendar from "./components/presentational/DisplayCalendar.jsx";
import Extracurricular from "./components/presentational/Extracurricular.jsx";

/* If we add isomorphism, this will be handy */
import ExecutionEnvironment from 'exenv';

import {calendarData} from './SchedulerGlobals.jsx';

/* Apollo */
import ApolloClient from 'apollo-boost';
import InMemoryCache, { ApolloProvider } from 'react-apollo';

/* For if we want Redux later on */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/* Recompose */
import { compose, lifecycle, withState, withProps, withHandlers, withStateHandlers } from 'recompose';


const client = new ApolloClient({ 
	uri: 'http://localhost:7777/graphqlV2',
});

var calendarHandler = null;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			classes: [], 
			activities: [] 
		};
		this.updateClassesHandler = this.updateClassesHandler.bind(this);
		this.updateActivitiesHandler = this.updateActivitiesHandler.bind(this);
	}

	updateClassesHandler(classes) {
		console.log("HANDLER CALLBACK CALLED.");
		this.setState({classes: classes});
	}

	updateActivitiesHandler(activities) {
		console.log("ACTIVITIES CALLBACK CALLED.");
		this.setState({activities: activities});
	}

	render() {
		return (<ApolloProvider client={client}>
			<div>
			<PageHeader />
			<div style={{
					display: 'flex',
					flexDirection: 'row', 
					justifyContent: 'flex-start',
					alignContent: 'top',
              		alignItems: 'left',
			}}>
				<SearchClasses 
					updateClassesHandler={this.updateClassesHandler}
				/>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Extracurricular 
						updateActivitiesHandler={this.updateActivitiesHandler}
					/>
					<DisplayCalendar 
						classes={this.state.classes} 
						activities={this.state.activities} 
					/>
				</div>
			</div>
			</div>
		</ApolloProvider>);
	}
}

if (ExecutionEnvironment.canUseDOM) {
	ReactDOM.render(<App />, document.getElementById("application"));
}
