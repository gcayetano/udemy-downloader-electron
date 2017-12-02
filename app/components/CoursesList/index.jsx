import React from 'react';
import {Grid} from 'react-bootstrap';
// import styles from './style.css';
import CourseRow from '../CourseRow/index.jsx';

class CourseList extends React.Component {
	render() {
		return (
			<Grid>
				<CourseRow />
			</Grid>
		);
	}
}

export default CourseList;