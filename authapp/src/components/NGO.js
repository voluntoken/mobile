// src/components/Home.js

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';




class NGO extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: '',
			loading: true
		};
	}
	
	componentDidMount () {
			
		axios
			.get(`/get_all_ngo/`)
			.then(response => {
				console.log("Got Data...")
				console.log(response.data)
				this.setState({
					data: response.data,
					loading: false
				});
					
			})
			.catch(error => {
				console.log(error)
				console.log("No Data...")
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
			content = this.state.data.map((ngo, index) => {
				return (
					<Card key={index}>
						<View>
							<Text> {ngo.name}: {ngo.description} </Text>
							
							<Button
								onPress={() => Actions.events({ obj: ngo})} 
								title={"More"}
							/>
						</View>
					</Card>
				);
			});
		}

		return (
			<ScrollView>
				{content}
			</ScrollView>
		);
	}
	
	
}


export default NGO;

