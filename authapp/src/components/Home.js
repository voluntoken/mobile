// src/components/Home.js

import React, { Component } from 'react';
import { Alert, View, Text, ActivityIndicator, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';




class Home extends Component {
	
	constructor() {
		super();
		this.state = {
			data: '',
			loading: true,
			user: ''
		};
	}
	
	 _onRefresh = () => {
		this.setState({loading: true});

		axios
			.get('/get_all_my_event/')
			.then(response => {
				console.log("Got Data...")
				console.log(response.data)
				
				this.setState({
						data: response.data,
				});	
				
				
				axios
					.get(`/get_user/`)
					.then(response => {
						console.log("Got User Data...")
						console.log(response.data)
						this.setState({
							user : response.data,
							loading: false,
						})				

					})
					.catch(error => {
						console.log(error)
						console.log("No Data...")
					});
					
			})		
			.catch(error => {
				console.log(error)
				console.log("No Data...")
			});

	}
	
	componentDidMount () {
		
		axios
			.get('/get_all_my_event/')
			.then(response => {
				console.log("Got Data...")
				console.log(response.data)
				
				this.setState({
						data: response.data,
				});	
				
				
				axios
					.get(`/get_user/`)
					.then(response => {
						console.log("Got User Data...")
						console.log(response.data)
						this.setState({
							user : response.data,
							loading: false,
						})				

					})
					.catch(error => {
						console.log(error)
						console.log("No Data...")
					});
					
			})		
			.catch(error => {
				console.log(error)
				console.log("No Data...")
			});

	}
	
	
		
	render () {
		let content;
		let tokens;
		
		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		} else { 
			
			
		
			content = this.state.data.map((event, index) => {
				return (
					<Card key={index}>
						<View>
							<Text> {event.name} </Text>
								<Button
									onPress={() => {
												Actions.check_in_out_detail({obj: event})
											}} 
									title={"Check In/Out"}
									type="outline"
								/>
								
								<Button onPress={() => this.unregister(event.id)} title={"Unregister"}/>
							
						</View>
					</Card>
				);
			});
			
			
			tokens = 
				<View>
					<Card>
						<Text> {this.state.user.volunteer_token} Voluntokens </Text>
					</Card>
				</View>
				
			
		}

		return (
			<ScrollView>
				<View style={style.small_space}>
				</View>
				<Text  style={style.titleText}> My Tokens </Text>
				{tokens}
				<View style={style.small_space}>
				</View>
				<Text  style={style.titleText}> My Events </Text>
				{content}
				<RefreshControl
					refreshing={this.state.loading}
					onRefresh={this._onRefresh}
				/>
			</ScrollView>
		);
	}
	
	unregister(event_id){
		
		axios
			.delete(`/signoff_user_for_event/`, { data: { parent_event: event_id } })
			.then(response => {
				
				console.log(response.data);
				
				Alert.alert(
					'You Unregistered'
				)
				
				axios
					.get('/get_all_my_event/')
					.then(response => {
						console.log("Got Data...")
						console.log(response.data)
						
						this.setState({
								data: response.data,
								loading: false,
							});	

					})
					.catch(error => {
						console.log(error)
						console.log("No Data...")
					});

				
			})
			.catch(error => {
				
				console.log(error)
				
			});
		
		
	}
	
	

	
}


const style = StyleSheet.create({
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
//	formContainerStyle: {
//		flex: 1,
//		flexDirection: 'column',
//		alignItems: 'center',
//		justifyContent: 'center',
//	},
	textInputStyle: {
		padding: 10
	},
	small_space:{
		paddingTop:30,
	},
	big_space:{
		paddingTop:100,
	},
//	fieldStyle: {
//		flexDirection: 'row',
//		justifyContent: 'center'
//	},
//	buttonContainerStyle: {
//		flex: 1,
//		justifyContent: 'center',
//		padding: 25
//	},
//	accountCreateTextStyle: {
//		color: 'black'
//	},
//	accountCreateContainerStyle: {
//		padding: 25,
//		alignItems: 'center'
//	}
});




export default Home;

