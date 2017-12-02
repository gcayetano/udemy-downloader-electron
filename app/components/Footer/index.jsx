import {React, Component} from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';
import styles from './style.css';

class Footer extends Component{
    render() {
        return (
            <footer className={styles.footer}>
                <Row>
                    <Col md={6}>
                        <span className={styles.copy}>Copyright 2017 - gcayetano</span>
                    </Col>
                    <Col md={6}>
                        <span className="pull-right">Sharing is the key</span>
                    </Col>
                </Row>
            </footer>
        );
    }
}
  
export default Footer;