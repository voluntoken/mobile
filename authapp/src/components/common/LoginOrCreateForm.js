 // src/components/common/LoginOrCreateForm.js

import React, { Component } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Switch } from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';


class LoginOrCreateForm extends Component {
	
	
	componentDidMount () {
		console.log("MOUNTING...")
//		AsyncStorage.clear()
	 	AsyncStorage.getItem('token').then((value) => {
			if(value){
				axios.defaults.headers.common.Authorization = `Token ${value}`;
				Actions.main();
			}else{
				this.setState({loading: false})
			}	
		})	
	}

	
	
	state = {
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		isPublic: false, 
		isDiscount: false, 
		loading: true,
		email: '',
	}
	
	onEmailChange(text) {
		this.setState({ email: text });
	}

	onUsernameChange(text) {
		this.setState({ username: text });
	}

	onPasswordChange(text) {
		this.setState({ password: text });
	}

	onFirstNameChange(text) {
		this.setState({ firstName: text });
	}

	onLastNameChange(text) {
		this.setState({ lastName: text });
	}
    toggleSwitch_public = (value) => {
		this.setState({isPublic: value})
	}
	
    toggleSwitch_discount = (value) => {
		this.setState({isDiscount: value})
	}

	renderCreateForm() {
		const { fieldStyle, textInputStyle } = style;
		if (this.props.create) {
			return (
				<View>
					<View >
						<TextInput
							placeholder="First name"
							autoCorrect={false}
							style={textInputStyle}
							onChangeText={this.onFirstNameChange.bind(this)}
				
						/>
						
						<TextInput
							placeholder="Last name"
							autoCorrect={false}
							onChangeText={this.onLastNameChange.bind(this)}
							style={textInputStyle}
					
						/>
						
						<TextInput
							placeholder="Email"
							value={this.state.email}
							autoCorrect={false}
							autoCapitalize="none"
							style={textInputStyle}
							onChangeText={this.onEmailChange.bind(this)}
						/>
					</View>	
					
					<View>
						<Text> Let other users see you?</Text>
						<Switch
								onValueChange = {this.toggleSwitch_public}
								value = {this.state.isPublic}
						/>
					</View>
					<View>
						<Text> Receive Discounts? </Text>
						<Switch
								onValueChange = {this.toggleSwitch_discount}
								value = {this.state.isDiscount}
						/>
					</View>
				</View>
				
			);
		}
	}


	renderCreateLink() {
		if (!this.props.create) {
			const { accountCreateTextStyle } = style;
			return (
				<Button title="Sign Up" onPress={() => Actions.register()}/>
			);
		}
	}

	render() {
		
		
		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		} else { 
		
			const {
				formContainerStyle,
				fieldStyle,
				textInputStyle,
				buttonContainerStyle,
				accountCreateContainerStyle
			} = style;

			return (
				<ScrollView style={{backgroundColor: 'white',}}>
						<View style={{ flex: 1, backgroundColor: 'white' }}>
							<View style={formContainerStyle}>
							
								<View style={style.small_space}>
								</View>
							
								<View>
									<Text style={style.titleText}> Welcome to Voluntoken! </Text>
								</View>
			
								<View style={fieldStyle}>
									<TextInput
										placeholder="username"
										autoCorrect={false}
										autoCapitalize="none"
										onChangeText={this.onUsernameChange.bind(this)}
										style={textInputStyle}
									/>
								</View>
								<View style={fieldStyle}>
									<TextInput
										secureTextEntry
										autoCapitalize="none"
										autoCorrect={false}
										placeholder="password"
										onChangeText={this.onPasswordChange.bind(this)}
										style={textInputStyle}
									/>
								</View>
								{this.renderCreateForm()}
							</View>
							
							<View style={style.small_space}>
							</View>
							
							<View style={buttonContainerStyle}>
								{this.renderButton()}
								{this.renderCreateLink()}
				
							</View>
						</View>
				</ScrollView>
			);
		}
	}
	
	
	
	handleRequest() {
		
		//commnet this out once db working
//		Actions.main();
		
		const endpoint = this.props.create ? 'register' : 'login';
		const payload = { username: this.state.username, password: this.state.password } 
				
		if (this.props.create) {
			payload.email = this.state.email
			payload.first_name = this.state.firstName;
			payload.last_name = this.state.lastName;
			payload.is_public = this.state.isPublic;
			payload.volunteer_role = "DO";
			
			if(this.state.isDiscount){
				payload.volunteer_role = "DI";
			}
			
		}
		
		axios
			.post(`/auth/${endpoint}/`, payload)
			.then(response => {
				const { token, user } = response.data;
				
//				console.log(user)
				// We set the returned token as the default authorization header
				axios.defaults.headers.common.Authorization = `Token ${token}`;
				console.log("token",token)
				
				AsyncStorage.setItem('token',token);

				
				// Navigate to the home screen
				Actions.main();
			})
			.catch(error => {
				
				Alert.alert("Error Logging in")
				console.log(error)
				console.log(error.response.data)
			
			
			});
			
	}

	renderButton() {
			const buttonText = this.props.create ? 'Sign Up' : 'Login';

			return (
				<Button title={buttonText} type="outline" onPress={this.handleRequest.bind(this)}/>
			);
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




export default LoginOrCreateForm;
