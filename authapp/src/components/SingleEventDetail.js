import React, { Component } from 'react';
import { Alert, View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';


class SingleEventDetail extends Component {

	constructor(props) {
		super(props);
		console.log("THE ID??")
		console.log(this.props.obj.id)
		this.state = {
			loading: true,
			event_id: this.props.obj.id, 
			has_signed_up: false	
		}
	}
	
	componentDidMount () {
		
		
		//curl -X POST http://voluntoken.herokuapp.com/api/is_user_registered_for_event/ -H 'Authorization: Token e41c7058ec5f612aac03989129f6b8fe447e866d' -d 'parent_event=2'
//		payload = {parent_event: this.state.event_id}
			
		axios
			.get(`/is_user_registered_for_event/`+this.state.event_id)
			.then(response => {
				console.log("Got Data...")
				console.log(response.data)
				
				if(response.data.is_user_registered_for_event == true){
					this.setState({
						has_signed_up: true,
						loading: false
					});	
				}else{
					this.setState({
						has_signed_up: false,
						loading: false
					});	
				}
				
			
			})
			.catch(error => {
				console.log(error)
				console.log("No Data...")
			});
						
	}
	
	render () {
		
		if (this.state.loading) {
			return (
				<View>
					<Text> {this.props.obj.name} </Text>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		}else{
					
			let has_signed_up = this.state.has_signed_up;
			let button; 
			
			if (has_signed_up == false) {
				button = <Button onPress={this.sign_up.bind(this)} title={"Sign Up"}/>;
			} else {
				button = <Button onPress={this.unregister.bind(this)} title={"Unregister"}/>;
			}
			
			return (
				<ScrollView>
				
				<View style={style.small_space}>
				</View>
				
				<Text  style={style.titleText}> {this.props.obj.name} </Text>
				<Text>			
					{new Intl.DateTimeFormat('en-US', { 
						year: 'numeric', 
						month: 'long', 
						day: '2-digit', 
						hour:'2-digit',
						minute: '2-digit',
					}).format(new Date(this.props.obj.start_time))}	
				</Text>
				<Text>			
					{new Intl.DateTimeFormat('en-US', { 
						year: 'numeric', 
						month: 'long', 
						day: '2-digit', 
						hour:'2-digit',
						minute: '2-digit',
					}).format(new Date(this.props.obj.end_time))}	
				</Text>
				<Text> {this.props.obj.description} </Text>
				
				
				{button}

			


				
				
				</ScrollView>
			);
		}
	}
	
	unregister(){
		
		axios
			.delete(`/signoff_user_for_event/`, { data: { parent_event: this.state.event_id } })
			.then(response => {
				
				console.log(response.data);
				
				Alert.alert(
					'You Unregistered'
				)
				
				this.setState({has_signed_up: false})
				
				Actions.pop();
				
			})
			.catch(error => {
				
				console.log(error)
				
			});
		
		
	}
	
	sign_up(){
		
//		curl -X POST -d "username=<NEW_USER>&password=<PASSWORD>" http://voluntoken.herokuapp.com/api/NGO/event/

		payload = {parent_event: this.state.event_id}
		axios
			.post(`/signup_user_for_event/`, payload)
			.then(response => {
				
				console.log(response.data);
				
				Alert.alert(
					'You Signed Up'
				)
				
				this.setState({has_signed_up: true})
				
				Actions.pop();
				
			})
			.catch(error => {
				
				console.log(error)
				
			});
		
		
	}

	goBack () {
		Actions.pop();	
	} 		
}

const style = StyleSheet.create({
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	textInputStyle: {
		padding: 10
	},
	small_space:{
		paddingTop:30,
	},
	big_space:{
		paddingTop:100,
	},

});

export default SingleEventDetail;