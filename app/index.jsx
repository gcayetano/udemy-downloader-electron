import React from 'react';
import {render} from 'react-dom';
import {Grid, Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import path from 'path';
import fs from 'fs';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import CourseList from './components/CoursesList/index.jsx';

const settingsFile = path.join(__dirname, 'config.json');
console.log(path.join(__dirname, "../", "public"))

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			showAuthModal: false,
			auth: "Bearer AT8JxZYF44CsOwTXgCYnbXD0Atc83c93dqKHKNzR"
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		// this.handleChange = this.handleChange.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
	}

	componentWillMount() {
		if(!fs.existsSync(settingsFile)){
			this.openModal();
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
			"authorization": this.state.auth
		}

		fs.writeFileSync(settingsFile, conf);
		this.closeModal();
	}

	// handleChange(e) {
	// 	let value = e.target.value;

	// 	if(!value.includes("Bearer")) {
	// 		this.setState({auth: "Bearer " + value});
	// 	}else{
	// 		this.setState({auth: value});
	// 	}
	// }

	render() {
		return (
			<Grid fluid={true}>
				<Header />
				<CourseList authorization={this.state.auth} />
				{/* <Footer /> */}

				{/* Modal */}
				<Modal show={this.state.showAuthModal} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Autenticación requerida</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup controlId="formBasicText">
							<ControlLabel>Authorization token</ControlLabel>
							<FormControl
								type="text"
								value={this.state.value}
								placeholder="Introduce tu token de autenticación"
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