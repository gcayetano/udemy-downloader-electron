import React from 'react';
import {Row, Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
import styles from './style.css';
import downloader from '../../controllers/UdemyDownloader';
import DownloadModal from '../DownloadModal/index.jsx'

const downloadTooltip = (
	<Tooltip id="tooltip">Descargar curso</Tooltip>
);

class CourseCard extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			showDownloadModal: false,
			media: []
		}

		this.downloadCourse = this.downloadCourse.bind(this);
	}

	componentDidMount(){
		let uDownloader = downloader.UdemyDownloader.init(this.props.courseId, this.props.auth);
		uDownloader.getCourseMedia(this.props.courseId, this.props.auth, (cmedia) => {
			this.setState({media: cmedia});
		})
		
	}

	downloadCourse() {
		this.setState({showDownloadModal: true})	
	}

	render(){

		let modal = null;

		if(this.state.showDownloadModal){
			modal = <DownloadModal media={this.state.media} conf={this.props.conf} />
		}

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
						<Button className="pull-right" onClick={this.downloadCourse}><Glyphicon glyph="circle-arrow-down" /></Button>
					</OverlayTrigger>
				</Row>

				{/* Download Modal */}
				{modal}
			</div>
		);
	}
}
  
export default CourseCard;