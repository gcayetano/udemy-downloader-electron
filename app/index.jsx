import React from 'react';
import {render} from 'react-dom';
import {Grid, Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import path from 'path';
import fs from 'fs';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseList from './components/CoursesList';
import AuthModal from './components/AuthModal';

const settingsFile = path.join(__dirname, '..', 'config.json');
const downloadPath = path.resolve(path.join('./', 'Descargas'));

let settingsFileExists = false;

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			showModal: false,
			conf: {}
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
		this.updateAppConf = this.updateAppConf.bind(this);
	}

	componentWillMount() {
		settingsFileExists = fs.existsSync(settingsFile);

		if(!settingsFileExists){
			this.openModal();
		}else{
			let config = JSON.parse(fs.readFileSync(settingsFile));

			if(!config.authorization || config.authorization == ""){
				this.openModal();
			}else{
				this.setState({conf: config});
			}
		}
	}

	openModal() {
		this.setState({ showModal: true });
	}

	closeModal() {
		this.setState({ showModal: false });
	}

	handleChange(e) {
		let value = e.target.value;

		if(!value.includes("Bearer")) {
			this.setState({conf: {authorization: "Bearer " + value}});
		}else{
			this.setState({conf: {authorization: value}});
		}
	}

	saveSettings() {
		let conf = {
			authorization: this.state.conf.authorization,
			download_dir: settingsFile
		}

		if(!settingsFileExists){
			conf.download_dir = downloadPath;
		}

		fs.writeFileSync(settingsFile, JSON.stringify(conf, null, 2));
		this.closeModal();
	}
	
	updateAppConf(newConf){
		this.setState({conf: newConf});
	}

	render() {
		return (
			<Grid fluid={true}>
				<Header conf={this.state.conf} settingsFile={settingsFile} updateAppConf={this.updateAppConf} />
				<CourseList conf={this.state.conf} />
				{/* <Footer /> */}

				{
					(this.state.showModal === true) ? <AuthModal show={this.state.showModal} handleChange={this.handleChange} saveSettings={this.saveSettings} /> : null
				}
			</Grid>	
		)
	}
}

render(<App/>, document.getElementById('app'));