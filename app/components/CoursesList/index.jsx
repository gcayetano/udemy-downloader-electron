import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import styles from './style.css';
import CourseCard from '../CourseCard/index.jsx';
import axios from 'axios';

class CourseList extends React.Component {

	constructor(props) {
		super(props);
		
        this.state = {
          courses: []
        };
	}
	
	componentWillMount(){
        const header = {
            'Authorization': this.props.authorization,
            'Access-Control-Allow-Origin': '*'
        }

        let results = [];

        axios.get("https://www.udemy.com/api-2.0/users/me/subscribed-courses?fields%5Bcourse%5D=@min,visible_instructors,image_240x135,image_480x270&page=1&page_size=12", {headers: header}).then((resp) => {
            this.setState({courses: resp.data.results});
            console.log(resp.data.results)
        });
    }

	render() {
		return (
			<Grid>
				<Row className={styles.courseRow}>
					{/* Cards */}
					{
						this.state.courses.map((item, i) => {
							return <CourseCard key={i} title={item.title} image={item.image_240x135} author={item.visible_instructors[0].title} />
						})
					}
				</Row>
			</Grid>
		);
	}
}

export default CourseList;