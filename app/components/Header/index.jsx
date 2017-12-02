import {React, Component} from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';
import styles from './style.css';

class Header extends Component {
	render(){
		return (
			<header>
				<Row>
					<Col md={2} lg={2} xs={1} className="text-center">
						<img className={styles.logo} src={require(`../../../public/img/logo.png`)} />
					</Col>
					<Col md={10} xsHidden={true}>
						<Button className={styles.settingsBtn}><Glyphicon glyph="wrench" /></Button>
					</Col>
				</Row>
			</header>
		);
	}
}
  
export default Header;