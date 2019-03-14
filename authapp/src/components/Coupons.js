// src/components/Home.js

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';




class Coupons extends Component {

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
				console.log(response.data)
				this.setState({
					data: response.data,
					loading: false
				});
				console.log("good :?")
			})
			.catch(error => {
				console.log("OH BOY SAD!!")
				console.log(error);
			});
	}


	//	<button onClick={goToDetail}>
	//		<Text> More </Text>
	//	</button>

	goToCoupon () {
		Actions.coupon_view({obj: "DFas"});
	}

	render () {
		let content;
//		const goToDetail = (user) => Actions.coupon_detail({obj: user});



		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);

		} else {
			content = this.state.data.map((user, index) => {
				return (
					<Card key={index}>
						<View>
							<Text> {user.name}: {user.email} </Text>
								<Button onPress={this.goToCoupon}>
									<Text> More </Text>
								</Button>
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


export default Coupons;
