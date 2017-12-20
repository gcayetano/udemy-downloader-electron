import React from 'react';
import {Row, Col, Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
import styles from './style.css';
import SettingsModal from '../SettingsModal';
import {shell} from 'electron';

const settingsTooltip = (
	<Tooltip id="tooltip">Configuración</Tooltip>
);

const downloadDirTooltip = (
	<Tooltip id="tooltip">Ver descargas</Tooltip>
);

class Header extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.openDownloadDir = this.openDownloadDir.bind(this);
	}

	openModal() {
		this.setState({showModal: true});
	}

	closeModal() {
		this.setState({showModal: false});
	}

	openDownloadDir() {
		shell.openItem(this.props.conf.download_dir);
	}

	render(){
		return (
			<header>
				<Row>
					<Col md={2} lg={2} xs={1}>
						<img className={styles.logo} src={require(`../../../public/img/logo.png`)} />
					</Col>
					<Col md={10} xsHidden={true}>
						<OverlayTrigger placement="bottom" overlay={settingsTooltip}>
							<Button className={styles.settingsBtn} onClick={this.openModal}><Glyphicon glyph="wrench" /></Button>
						</OverlayTrigger>
						<OverlayTrigger placement="bottom" overlay={downloadDirTooltip}>
							<Button className={styles.settingsBtn} onClick={this.openDownloadDir}><Glyphicon glyph="folder-open" /></Button>
						</OverlayTrigger>
					</Col>
				</Row>

				{
					(this.state.showModal) ? <SettingsModal show={this.state.showModal} conf={this.props.conf} updateAppConf={this.props.updateAppConf} keepSettingsClosed={this.closeModal} settingsFile={this.props.settingsFile} /> : null
				}
			</header>
		);
	}
}
  
export default Header;