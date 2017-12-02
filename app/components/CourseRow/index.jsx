import React from 'react';
import {Row} from 'react-bootstrap';
import styles from './style.css';
import CourseCard from '../CourseCard/index.jsx';


const CourseRow = (props) => {
	return (
		<Row className={styles.courseRow}>
            {/* Cards */}
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </Row>
	);
}
  
export default CourseRow;