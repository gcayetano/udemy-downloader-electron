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
			currentProgress: 0,
			currentFile: '',
			currentDownload: 0,
			showModal: this.props.show,
			ready: this.props.show
		}

		this.downloadFromUrl = this.downloadFromUrl.bind(this);
	
		this.downloadRecrusive = this.downloadRecrusive.bind(this);
		this.downloadCourse = this.downloadCourse.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidUpdate(){
		if(this.props.show){
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

			// Create chapter dir
			if(!fs.existsSync(chapterDir)){
				fs.mkdirSync(chapterDir);
			}

			m.lectures.map((l, j) => {
				let lecture = l;
				
				if(lecture.asset_type === 'Video'){
					let filename = lecture.object_index + ". " + lecture.title.replace(":", " -").replace("/", "-") + ".mp4";
					let link = lecture.link;

					// if(!this.state.finished) {
					// 	this.downloadFromUrl(link, path.resolve(path.join(chapterDir, filename)), () =>{
					// 		this.setState({currentProgress: this.state.currentProgress+1, currentDownload: this.state.currentDownload+1, currentFile: filename});
					// 	});
					// }	
					lecturesArr.push({link: lecture.link, dir: path.resolve(path.join(chapterDir, filename)), filename: filename, index: lecture.object_index, downloaded: false});
				}
			});
		});

		let lecturesSorted = (lecturesArr.sort((a, b) => {
			return a.index - b.index;
		}));
		
		Promise.each(lecturesSorted, lecture => new Promise((resolve, reject) => {
			if(!lecture.downloaded){
				console.log('Downloading file: ' + lecture.filename);
				request(lecture.link).on('error', reject).pipe(fs.createWriteStream(lecture.dir)).on('finish', () => {
					console.log('Downloaded file: ' + lecture.filename);
					lecture.downloaded = true;
					resolve();
					//self.setState({currentProgress: self.state.currentProgress+1, currentDownload: self.state.currentDownload+1, currentFile: lecture.filename});				
				});
			}
		})).then(() => {
			console.log('All files Downloaded!');
		}).catch(err => {
			console.error('Failed: ' + err.message);
		});
	}

	downloadFromUrl(url, dest, cb) {
		var file = fs.createWriteStream(dest);
		var self = this;
		var request = https.get(url, function(response) {
			response.pipe(file);

			// response.on('data', function(){
			// 	if(self.state.finished){
			// 		file.destroy();
			// 		file.close();
			// 		file.end();
			// 	}
			// });

			file.on('finish', function() {
				file.close(cb);  // close() is async, call cb after close completes.
			});
		}).on('error', function(err) { // Handle errors
			fs.unlink(dest); // Delete the file async. (But we don't check the result)
			if (cb) cb(err.message);
		});
	}

	downloadRecrusive(lecturesArray, dir, index, cb) {
		var count = lecturesArray.length - 1;
		let lecture = lecturesArray[index];
		var self = this;

		// console.log(lecturesArray, dir, index)
		if(lecture && lecture.asset_type && lecture.asset_type === 'Video'){
			let filename = lecture.object_index + ". " + lecture.title.replace(":", " -").replace("/", "-") + ".mp4";
			let dest = path.resolve(path.join(dir, filename)) ;
			// let file;
			// var request = https.get(lecture.link, function(response) {
			// 	file = fs.createWriteStream(dest);
			// 	response.pipe(file);
			// }).on('finish', () => {
			// 	file.close();
			// 	if (index + 1 < count) {
			// 		this.downloadRecrusive(lecturesArray, dir, index+1, cb);
			// 	}
			// })

			var stream = request(lecture.link).pipe(fs.createWriteStream(dest));
			
			stream.on('finish', function () {
				console.log("Downloaded", index);
				stream.close();
				if (index + 1 < count) {
					//Finished, download next file
					self.downloadRecrusive(lecturesArray, dir, index+1, cb);
				}
			});
		}else{
			self.downloadRecrusive(lecturesArray, dir, index+1, cb);
		}
		
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