import React from 'react';
import {Row, Col, Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap';
import styles from './style.css';

const settingsTooltip = (
	<Tooltip id="tooltip">Configuración</Tooltip>
);

class Header extends React.Component {
	render(){
		return (
			<header>
				<Row>
					<Col md={2} lg={2} xs={1}>
						<img className={styles.logo} src={require(`../../../public/img/logo.png`)} />
					</Col>
					<Col md={10} xsHidden={true}>
						<OverlayTrigger placement="bottom" overlay={settingsTooltip}>
							<Button className={styles.settingsBtn}><Glyphicon glyph="wrench" /></Button>
						</OverlayTrigger>
					</Col>
				</Row>
			</header>
		);
	}
}
  
export default Header;