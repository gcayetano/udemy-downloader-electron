import React from 'react';
import {Row, Col} from 'react-bootstrap';
import styles from './style.css';

const navbarInstance = (
	<header>
		<Row>
			<Col md={2}>
				<img className={styles.logo} src={require(`../../../public/img/logo.png`)} />
			</Col>
		</Row>
	</header>
);

const Header = (props) => {
	return (
		navbarInstance
	);
}
  
export default Header;