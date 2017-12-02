import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-bootstrap';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import CourseList from './components/CoursesList/index.jsx';

const App = () => (
	<Grid fluid={true}>
		<Header />
		<CourseList />
		{/* <Footer /> */}
	</Grid>
);

render(<App/>, document.getElementById('app'));