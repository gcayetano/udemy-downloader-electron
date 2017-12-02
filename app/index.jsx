import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-bootstrap';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import CourseList from './components/CoursesList/index.jsx';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			auth: ""
		}
	}

	render() {
		return (
			<Grid fluid={true}>
				<Header />
				<CourseList authorization={this.state.auth} />
				{/* <Footer /> */}
			</Grid>
		)
	}
}

render(<App/>, document.getElementById('app'));