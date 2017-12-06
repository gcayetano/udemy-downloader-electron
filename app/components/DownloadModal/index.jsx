import React from 'react';
import {Row, Button, Modal, ProgressBar} from 'react-bootstrap';
import path from 'path';
import fs from 'fs';
import https from 'https';

class DownloadModal extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			modalTitle: 'Descargando...',
			finished: false,
			currentProgress: 0,
			currentFile: '',
			currentDownload: 0,
			showModal: true
		}

		this.downloadFromUrl = this.downloadFromUrl.bind(this);
		this.downloadCourse = this.downloadCourse.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount(){
		this.downloadCourse(this.props.media);
	}

	closeModal(){
		this.setState({showModal: false, finished: true});
	}

	downloadCourse(media){
		// // Create download dir if not exists
		if(!fs.existsSync(this.props.conf.download_dir)){
			fs.mkdirSync(this.props.conf.download_dir);
		}

		media.map((m, i) => {
			let chapterDir = path.resolve(path.join(this.props.conf.download_dir, m.title));

			// Create chapter dir
			if(!fs.existsSync(chapterDir)){
				fs.mkdirSync(chapterDir);
			}

			m.lectures.map((l, j) => {
				let lecture = l;
				
				if(lecture.asset_type === 'Video'){
					let filename = lecture.object_index + ". " + lecture.title.replace(":", " -").replace("/", "-") + ".mp4";
					let link = lecture.link;

					if(!this.state.finished) {
						this.downloadFromUrl(link, path.resolve(path.join(chapterDir, filename)), () =>{
							this.setState({currentProgress: this.state.currentProgress+1, currentDownload: this.state.currentDownload+1, currentFile: filename});
						});
					}	
				}
			});
		});
	}

	downloadFromUrl(url, dest, cb) {
		var file = fs.createWriteStream(dest);
		var request = https.get(url, function(response) {
			response.pipe(file);
			file.on('finish', function() {
				file.close(cb);  // close() is async, call cb after close completes.
			});
		}).on('error', function(err) { // Handle errors
			fs.unlink(dest); // Delete the file async. (But we don't check the result)
			if (cb) cb(err.message);
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
					<ProgressBar active now={this.state.currentProgress} min={0} max={maxProgress} striped={true} label={`${this.state.currentDownload}/${maxProgress}`} />
				</Modal.Body>
				<Modal.Footer>
					{closeButton}
				</Modal.Footer>
			</Modal>
		);
	}
}
  
export default DownloadModal;