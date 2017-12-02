import {React, Component} from 'react';
import {Grid} from 'react-bootstrap';
// import styles from './style.css';
import CourseRow from '../CourseRow/index.jsx';

class CourseList extends Component {
	render() {
		return (
			<Grid>
				<CourseRow />
			</Grid>
		);
	}
}

export default CourseList;