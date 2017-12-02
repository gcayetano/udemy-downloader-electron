import React from 'react';
import {Row} from 'react-bootstrap';
import styles from './style.css';
import CourseCard from '../CourseCard/index.jsx';
import axios from 'axios';

class CourseRow extends React.Component {
    render() {
        return (
            <Row className={styles.courseRow}>
                {/* Cards */}
            </Row>
        );
    }
}
  
export default CourseRow;