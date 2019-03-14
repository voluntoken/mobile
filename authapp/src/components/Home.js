// src/components/Home.js

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';




class Home extends Component {
	
	constructor() {
		super();
		this.state = {
			data: '',
			loading: true
		};
	}
	
	componentDidMount () {
			
		const url = 'https://jsonplaceholder.typicode.com/users';
			
		// in axios access data with .data
		axios.get(url)
			.then(response => {
//				console.log(response.data)
				this.setState({
					data: response.data,
					loading: false
				});
				console.log("got data")
			})
			.catch(error => {
				console.log("no data")
				console.log(error);
			});
	}
	
	
		
	render () {
		let content;
		
		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		} else { 
			content = 
					(
					<Text> Welcome to VolenToken! </Text>
				);
		
		}

		return (
			<ScrollView>
				{content}
			</ScrollView>
		);
	}
	
	
}


export default Home;

