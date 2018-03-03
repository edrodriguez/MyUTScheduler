import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* Import Bootstrap Table and its CSS */
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


var classes = [
	{
      id: 1,
      name: "Class One",
      time: "1:20 PM"
  	}, 
  	{
      id: 2,
      name: "Class Two",
      time: "8:00 PM"
  	}
  ];

class CellHTML extends Component {
	render() {
		var show = this.props.show;
		const Inner = (props) => {

			if (show) {
				return (
					<div id="registered">
						<p>Course: </p>
				  		<p>Time: </p>
				  		<p>Place: </p>
				  	</div>
				);
				
			} else {
				return (<div></div>);
			}
		}

		return (
			<div>
				<Inner />
			</div>
		);
	}


}

CellHTML.propTypes = {
	show: PropTypes.bool.isRequired,
};

CellHTML.defaultProps = {
	show: false
};

function cellFormatter(cell, row, x) {
	console.log(cell);
	console.log(row);

	/* NOTE: We should do something like this
	 * to display the course information on our calendar
	 */

	if (row["id"] == 2) {
		return (<CellHTML show />
		);
	} else {
		return (<CellHTML />);
	}

	
}



export default class DisplayCalendar extends Component {
	render() {
		return (
			<div>
			<BootstrapTable data={classes} striped hover>

				<TableHeaderColumn isKey dataField='time'>Time</TableHeaderColumn>
				<TableHeaderColumn dataField="name" dataFormat={cellFormatter}>
					Monday
				</TableHeaderColumn>
				<TableHeaderColumn>Tuesday</TableHeaderColumn>
				<TableHeaderColumn>Wednesday</TableHeaderColumn>
				<TableHeaderColumn>Thursday</TableHeaderColumn>
				<TableHeaderColumn>Friday</TableHeaderColumn>
				<TableHeaderColumn>Saturday</TableHeaderColumn>
				<TableHeaderColumn>Sunday</TableHeaderColumn>
			</BootstrapTable>
			</div>
		);
	}
}


