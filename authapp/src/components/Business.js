// src/components/Home.js

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';




class Business extends Component {
	
	constructor() {
		super();
		this.state = {
			data: '',
			loading: true
		};
	}
	
	componentDidMount () {
			
		axios
			.get(`/get_all_business/`)
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
			content = this.state.data.map((business, index) => {
				return (
					<Card key={index}>
						<View>
							<Text> {business.name}: {business.description} </Text>
							
							<Button
								onPress={() => Actions.coupons({ obj: business})} 
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


export default Business;

