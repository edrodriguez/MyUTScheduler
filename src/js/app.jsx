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
import Input from "./components/presentational/Input.jsx";
import PageHeader from "./components/presentational/PageHeader.jsx";
import SearchClasses from "./components/presentational/SearchClasses.jsx";
import DisplayCalendar from "./components/presentational/DisplayCalendar.jsx";

import ExecutionEnvironment from 'exenv';
/* Apollo */
import ApolloClient from 'apollo-boost';
import InMemoryCache, { ApolloProvider } from 'react-apollo';
/* For if we want Redux later on */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const client = new ApolloClient({ 
	uri: 'http://localhost:7777/graphql',
	// cache: new InMemoryCache({
	//     dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}`: null),
	//   })
});

if (ExecutionEnvironment.canUseDOM) {
	ReactDOM.render((
		<ApolloProvider client={client}>
			<div>
			<PageHeader />
			<div style={{
					display: 'flex',
					flexDirection: 'row', 
					justifyContent: 'flex-start',
					alignContent: 'top',
              		alignItems: 'left',
			}}>
				<SearchClasses />
				<DisplayCalendar />
			</div>
			</div>
		</ApolloProvider>
	), document.getElementById("application"));
}
