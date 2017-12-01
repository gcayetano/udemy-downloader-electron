import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-bootstrap';
import Header from './components/Header/index.jsx';

const App = () => (
	<Grid fluid={true}>
		<Header />
	</Grid>
);

render(<App/>, document.getElementById('app'));