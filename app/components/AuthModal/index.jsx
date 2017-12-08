import React from 'react';
import {Button, Modal, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

class AuthModal extends React.Component {
	render(){		
		return (
			// Authentication Modal
			<Modal show={this.props.show} backdrop='static'>
				<Modal.Header>
					<Modal.Title>Autenticación requerida</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormGroup>
						<ControlLabel>Authorization token</ControlLabel>
						<FormControl
							type="text"
							placeholder="Introduce tu token de autenticación"
							onChange={this.props.handleChange}
						/>
					</FormGroup>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button onClick={this.props.closeModal}>Cerrar</Button> */}
					<Button bsStyle="primary" onClick={this.props.saveSettings}>Guardar</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
  
export default AuthModal;