import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import styles from './style.css';
import CourseCard from '../CourseCard';
import axios from 'axios';

class CourseList extends React.Component {

	constructor(props) {
		super(props);
		
        this.state = {
			courses: [],
			ready: false
        };
	}
	
	componentDidMount(){
        if(this.props.conf.authorization) {
			this.loadCourses();
		}
	}

	componentDidUpdate() {
		if(this.state.ready) {
			this.loadCourses();
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.conf.authorization) {
			this.setState({ready: true});
		}
	}

	loadCourses() {
		const header = {
			'Authorization': this.props.conf.authorization,
			'Access-Control-Allow-Origin': '*'
		}
		
		axios.get("https://www.udemy.com/api-2.0/users/me/subscribed-courses?fields%5Bcourse%5D=@min,visible_instructors,image_240x135,image_480x270&page=1&page_size=12", {headers: header}).then((resp) => {
			this.setState({courses: resp.data.results});
		});
	}

	render() {
		return (
			<Grid>
				<Row className={styles.courseRow}>
					{/* Cards */}
					{
						this.state.courses.map((item, i) => {
							return <CourseCard key={i} title={item.title} image={item.image_240x135} author={item.visible_instructors[0].title} courseId={item.id} conf={this.props.conf} />
						})
					}
				</Row>
			</Grid>
		);
	}
}

export default CourseList;