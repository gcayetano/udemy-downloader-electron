import React from 'react';
import {render} from 'react-dom';
import {Grid, Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import path from 'path';
import fs from 'fs';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import CourseList from './components/CoursesList/index.jsx';

const settingsFile = path.join(__dirname, '..', 'config.json');
const downloadPath = path.resolve(path.join('./', 'Descargas'));

let settingsFileExists = false;

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			showAuthModal: false,
			conf: ""
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
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
		this.setState({ showAuthModal: true });
	}

	closeModal() {
		this.setState({ showAuthModal: false });
	}

	saveSettings() {
		let conf = {
			"authorization": this.state.conf.authorization
		}

		if(!settingsFileExists){
			conf.download_dir = downloadPath;
		}

		fs.writeFileSync(settingsFile, JSON.stringify(conf, null, 2));
		this.closeModal();
	}

	handleChange(e) {
		let value = e.target.value;

		if(!value.includes("Bearer")) {
			this.setState({conf: {authorization: "Bearer " + value}});
		}else{
			this.setState({conf: {authorization: value}});
		}
	}

	render() {
		return (
			<Grid fluid={true}>
				<Header />
				<CourseList conf={this.state.conf} />
				{/* <Footer /> */}

				{/* Modal */}
				<Modal show={this.state.showAuthModal} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Autenticación requerida</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<ControlLabel>Authorization token</ControlLabel>
							<FormControl
								type="text"
								placeholder="Introduce tu token de autenticación"
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeModal}>Cerrar</Button>
						<Button bsStyle="primary" onClick={this.saveSettings}>Guardar</Button>
					</Modal.Footer>
				</Modal>
			</Grid>	
		)
	}
}

render(<App/>, document.getElementById('app'));