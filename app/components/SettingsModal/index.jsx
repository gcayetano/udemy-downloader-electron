import React from 'react';
import {Row, Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import fs from 'fs';

class SettingsModal extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			showModal: this.props.show,
			conf: this.props.conf
		}

		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.show) {
			this.setState({showModal: nextProps.show});
		}
	}

	closeModal(){
		this.setState({showModal: false});
    }
    
    saveSettings() {
		fs.writeFileSync(this.props.settingsFile, JSON.stringify(this.state.conf, null, 2));
		this.closeModal();
		this.props.updateAppConf(this.state.conf);
		this.props.keepSettingsClosed();
    }
    
    handleChange(e) {
		let name = e.target.name;
		let value = e.target.value;

		if(name === "authTokenInput"){
			if(!value.includes("Bearer")) {
				this.state.conf.authorization = "Bearer" + value;
			}else{
				this.state.conf.authorization = value;
			}
		}else if(name === "downloadDirInput") {
			this.state.conf.download_dir = value;
		}
	}

	render(){
		return (
			// Settings Modal
			<Modal show={this.state.showModal} backdrop='static' onHide={this.closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Configuración</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormGroup>
						<ControlLabel>Authorization token</ControlLabel>
						<FormControl
							type="text"
							placeholder="Introduce tu token de autenticación"
							onChange={this.handleChange}
							defaultValue={this.state.conf.authorization}
							name='authTokenInput'
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Carpeta de descargas</ControlLabel>
						<FormControl
							type="text"
							placeholder="Carpeta de descargas"
							onChange={this.handleChange}
							defaultValue={this.state.conf.download_dir}
							name='downloadDirInput'
						/>
					</FormGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.closeModal}>Cerrar</Button>
					<Button bsStyle="primary" onClick={this.saveSettings}>Guardar</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
  
export default SettingsModal;