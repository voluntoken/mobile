 // src/components/common/LoginOrCreateForm.js

import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage, ActivityIndicator} from 'react-native';


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
					<View style={fieldStyle}>
						<TextInput
							placeholder="First name"
							autoCorrect={false}
							onChangeText={this.onFirstNameChange.bind(this)}
							style={textInputStyle}
						/>
						
						<TextInput
							placeholder="Last name"
							autoCorrect={false}
							onChangeText={this.onLastNameChange.bind(this)}
							style={textInputStyle}
						/>
						
						
						<Text> Let other users see you?</Text>
						<Switch
								style={{marginTop:30}}
								onValueChange = {this.toggleSwitch_public}
								value = {this.state.isPublic}
						/>
						
						
						<Text> Receive Discounts? </Text>
						<Switch
								style={{marginTop:30}}
								onValueChange = {this.toggleSwitch_discount}
								value = {this.state.isDiscount}
						/>
						
					</View>
			);
		}
	}

	renderButton() {
		const buttonText = this.props.create ? 'Create' : 'Login';

		return (
			<Button title={buttonText} onPress={this.handleRequest.bind(this)}/>
		);
	}


	renderCreateLink() {
		if (!this.props.create) {
			const { accountCreateTextStyle } = style;
			return (
				<Text style={accountCreateTextStyle}>
					Or 
					<Text style={{ color: 'blue' }} onPress={() => Actions.register()}>
						{' Sign-up'}
					</Text>
				</Text>
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
				<View style={{ flex: 1, backgroundColor: 'white' }}>
					<View style={formContainerStyle}>
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
					<View style={buttonContainerStyle}>
						{this.renderButton()}
						<View style={accountCreateContainerStyle}>
							{this.renderCreateLink()}
						</View>
					</View>
				</View>
			);
		}
	}
	
	handleRequest() {
		
		//commnet this out once db working
//		Actions.main();
		
		const endpoint = this.props.create ? 'register' : 'login';
		const payload = { username: this.state.username, password: this.state.password } 
				
		if (this.props.create) {
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
			.catch(error => console.log(error));
			
	}

	renderButton() {
			const buttonText = this.props.create ? 'Create' : 'Login';

			return (
				<Button title={buttonText} onPress={this.handleRequest.bind(this)}/>
			);
		}
		
}


const style = StyleSheet.create({
//	formContainerStyle: {
//		flex: 1,
//		flexDirection: 'column',
//		alignItems: 'center',
//		justifyContent: 'center',
//	},
//	textInputStyle: {
//		flex: 1,
//		padding: 15
//	},
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
