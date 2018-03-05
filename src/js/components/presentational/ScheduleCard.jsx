import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    background: '#0A0A5F',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 5,
    fontSize: 16,
    color: '#CCC',
  },

  p: {
  	marginBottom: 3,
    wordBreak: 'normal',
  	whiteSpace: 'normal',
	wordWrap: 'normal',
	color: '#FFF',
  },
  edit: {
  	color: '#FAFA0A',
  }
});

const CellHTML = ({show, subject, number, title}) => {
	return show ? (
		<div id="registered">
			<p className="cellhtml">Course: {title}</p>
			<p className="cellhtml">Subject: {subject} {number}</p>
	  	</div>
	) : '';
};


const ScheduleCard = (props) => {
	const { classes, show, subject, number, title } = props;
	const bull = <span className={classes.bullet}>•</span>;

	return (
	    <div>
	      <Card className={classes.card}>
	        <CardContent>
	          <Typography className={classes.title}>Course: </Typography>
	          <Typography className={classes.p} component="p">
	             {title}
	          </Typography>
	          <Typography className={classes.title}>Where:</Typography>
	          <Typography className={classes.p} component="p">
	             {subject} {number}
	          </Typography>
	        </CardContent>
	        <CardActions>
	          <Button size="small" className={classes.edit} >Modify</Button>
	        </CardActions>
	      </Card>
	    </div>
  	);
};

ScheduleCard.propTypes = {
	classes: PropTypes.object.isRequired,
	show: PropTypes.bool.isRequired,
	subject: PropTypes.string,
	number: PropTypes.string,
	title: PropTypes.string
};
ScheduleCard.defaultProps = {
	classes: null,
	show: false,
	subject: '',
	number: '',
	title: ''
};

export default withStyles(styles)(ScheduleCard);