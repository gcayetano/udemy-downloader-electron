import React from 'react';
import {Button, Modal, ProgressBar} from 'react-bootstrap';
import path from 'path';
import fs from 'fs';
import https from 'https';
import request from 'request';
import Promise from 'bluebird';

class DownloadModal extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			modalTitle: 'Descargando...',
			finished: false,
			downloading: false,
			style: 'info',
			currentProgress: 0,
			currentFile: '',
			currentDownload: 0,
			showModal: this.props.show,
			ready: this.props.show
		}

		this.downloadCourse = this.downloadCourse.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidUpdate(){
		if(this.props.show && !this.state.downloading){
			this.downloadCourse(this.props.media);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.show) {
			this.setState({showModal: nextProps.show, finished: false});
		}
	}

	closeModal(){
		this.setState({showModal: false, finished: true});
	}

	downloadCourse(media){
		// Set state to "downloading" for avoid call this function for every setState call
		if(!this.state.downloading){
			this.setState({downloading: true})
		}

		// Create download dir if not exists
		if(!fs.existsSync(this.props.conf.download_dir)){
			fs.mkdirSync(this.props.conf.download_dir);
		}

		// Create course dir if not exists
		let courseDir = path.join(this.props.conf.download_dir, this.props.courseTitle.replace(":", " -"));
		if(!fs.existsSync(courseDir)){
			fs.mkdirSync(courseDir);
		}

		let lecturesArr = [];
		let self = this;


		media.map((m, i) => {
			let chapterDir = path.resolve(path.join(courseDir, m.title));

			// Create chapter dir if chapter contains video lectures
			if(m.lectures.find(x => x.asset_type === 'Video')){
				if(!fs.existsSync(chapterDir)){
					fs.mkdirSync(chapterDir);
				}
			}

			// Create chapter dir
			m.lectures.map((l, j) => {
				let lecture = l;
				
				if(lecture.asset_type === 'Video'){
					let filename = lecture.object_index + ". " + lecture.title.replace(":", " -").replace("/", "-") + ".mp4";
					let link = lecture.link;
	
					lecturesArr.push({link: lecture.link, dir: path.resolve(path.join(chapterDir, filename)), filename: filename, index: lecture.object_index});
				}
			});
		});

		let lecturesSorted = (lecturesArr.sort((a, b) => {
			return a.index - b.index;
		}));

		Promise.each(lecturesSorted, lecture => new Promise((resolve, reject) => {
			if(!self.state.finished){
				request(lecture.link).on('error', () => {
					self.setState({modalTitle: 'Ha ocurrido un error', finished: true, style: 'danger'});
					reject();
				}).pipe(fs.createWriteStream(lecture.dir)).on('finish', () => {
					self.setState({currentProgress: self.state.currentProgress+1, currentDownload: self.state.currentDownload+1, currentFile: lecture.filename});				
					resolve();
				}).on('error', () => {
					self.setState({modalTitle: 'Ha ocurrido un error', finished: true, style: 'danger'});
					reject();
				});
			}
		})).then(() => {
			// console.log('All files Downloaded!');
			self.setState({modalTitle: 'Descarga completada', finished: true, style: 'success'});
		}).catch(err => {
			// console.error('Failed: ' + err.message);
			self.setState({modalTitle: 'Ha ocurrido un error', finished: true, style: 'danger'});
		});
	}

	render(){
		let closeButton = null;

		if(this.state.finished){
			closeButton = <Button onClick={this.closeModal}>Cerrar</Button>
		}

		let maxProgress=0;

		this.props.media.map((m, i) => {
			m.lectures.map((l, j) => {
				if(l.asset_type === 'Video') {
					maxProgress += 1;
				}
			});
		});

		return (
			// Download Modal
			<Modal show={this.state.showModal} onHide={this.closeModal} backdrop='static' onHide={this.closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>{this.state.modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>{this.state.currentFile}</h5>
					{
						(this.state.finished) ? <ProgressBar bsStyle={this.state.style} active now={this.state.currentProgress} min={0} max={maxProgress} striped={true} label={`${this.state.currentDownload}/${maxProgress}`} /> : <ProgressBar active now={this.state.currentProgress} min={0} max={maxProgress} striped={true} label={`${this.state.currentDownload}/${maxProgress}`} />
					}
				</Modal.Body>
				<Modal.Footer>
					{closeButton}
				</Modal.Footer>
			</Modal>
		);
	}
}
  
export default DownloadModal;