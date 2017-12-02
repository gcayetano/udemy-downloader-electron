import React from 'react';
import {Grid} from 'react-bootstrap';
// import styles from './style.css';
import CourseRow from '../CourseRow/index.jsx';

const CourseList = (props) => {
	return (
		<Grid>
            <CourseRow />
        </Grid>
	);
}
  
export default CourseList;