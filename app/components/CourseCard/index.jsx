import React from 'react';
import {Row, Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
import styles from './style.css';

const downloadTooltip = (
	<Tooltip id="tooltip">Descargar curso</Tooltip>
);

class CourseCard extends React.Component {
	render(){
		return (
			<div className={styles.card}>
				<Row bsClass={styles.cardImage} style={{backgroundImage: 'url(' + this.props.image + ')'}}>
				</Row>
				<Row bsClass={styles.cardTitle}>
					{/* Card Title */}
					<OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">{this.props.title}</Tooltip>}>
						<a href="javascript:void(0)"><p>{this.props.title}</p></a>
					</OverlayTrigger>
				</Row>
				<Row bsClass={styles.cardDesc}>
					{/* Card Description */}
					<span>{this.props.author}</span>
				</Row>
				<Row bsClass={styles.cardBtn}>
					{/* Card Download Button */}
					<OverlayTrigger placement="bottom" overlay={downloadTooltip}>
						<Button className="pull-right"><Glyphicon glyph="circle-arrow-down" /></Button>
					</OverlayTrigger>
				</Row>
			</div>
		);
	}
}
  
export default CourseCard;