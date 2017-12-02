import React from 'react';
import {Row, Button, Glyphicon} from 'react-bootstrap';
import styles from './style.css';

const CourseCard = (props) => {
	return (
		<div className={styles.card}>
			<Row bsClass={styles.cardImage}>
				{/* Card Image */}
			</Row>
			<Row bsClass={styles.cardTitle}>
				{/* Card Title */}
				<span>[TITLE]</span>
			</Row>
			<Row bsClass={styles.cardDesc}>
				{/* Card Description */}
				<span>[Description]</span>
			</Row>
			<Row bsClass={styles.cardBtn}>
				{/* Card Download Button */}
				<Button className="pull-right"><Glyphicon glyph="circle-arrow-down" /></Button>
			</Row>
		</div>
	);
}
  
export default CourseCard;