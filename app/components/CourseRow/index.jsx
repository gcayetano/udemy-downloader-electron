import {React, Component} from 'react';
import {Row} from 'react-bootstrap';
import styles from './style.css';
import CourseCard from '../CourseCard/index.jsx';
import axios from 'axios';

class CourseRow extends Component {
    render() {
        return (
            <Row className={styles.courseRow}>
                {/* Cards */}
                {
                    results.map((item, i) => {
                        return <CourseCard title={item.title} image={item.image_240x135} />
                    })
                }
            </Row>
        );
    }
}
  
export default CourseRow;