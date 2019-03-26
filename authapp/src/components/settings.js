 // src/components/common/LoginOrCreateForm.js

import React, { Component } from 'react';
import { Button, Modal, View, Text, TextInput, StyleSheet, Switch, Alert,ScrollView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage, ActivityIndicator} from 'react-native';


class Settings extends Component {
	
	
	constructor() {
	
		super();
		
		this.state = {
			loading: true,
			user: '',
			email: '',
			firstName: '',
			lastName: '',
			isPublic: false, 
			isDiscount: false, 
			modalVisible: false,
			curr_password: '',
			new_password: '',
		};
	
	}

	componentDidMount(){
		
		axios
			.get(`/get_user/`)
			.then(response => {
				console.log("Got User Data...")
				console.log(response.data)
				this.setState({
					user : response.data,
					loading: false,
				})
				var is_public = response.data.is_public
				var is_discount = false; 
				
				if(response.data.volunteer_role === "DI"){
					is_discount = true
				}		
				this.setState({
					isPublic : is_public,
					isDiscount: is_discount,
					email: response.data.email,
					firstName: response.data.first_name,
					lastName: response.data.last_name,
				})
					

			})
			.catch(error => {
				console.log(error)
				console.log("No Data...")
			});
		
		
	}
	

	onCurrPassChange(text) {
		this.setState({ curr_password: text });
	}
	
	onNewPassChange(text) {
		this.setState({ new_password: text });
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
	
	
	onEmailChange(text) {
		this.setState({ email: text });
	}

    toggleSwitch_public = (value) => {
		this.setState({isPublic: value})
	}
	
    toggleSwitch_discount = (value) => {
		this.setState({isDiscount: value})
	}





	render() {
		
		
		if (this.state.loading) {
			return (
				<View>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		} else { 
			

			return (
				<ScrollView style={{backgroundColor: 'white',}}>
				
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						presentationStyle='formSheet'
						onRequestClose={() => {
							this.setModalVisible(!this.state.modalVisible);
						}}>
						<View style={{marginTop: 60}}>
							<View>
							
								<View style={style.small_space}>
								</View>
								
								<Text style={style.titleText}>Enter Old Password </Text>

								<TextInput
									secureTextEntry
									placeholder="password"
									value={this.state.curr_password}
									autoCorrect={false}
									autoCapitalize="none"
									onChangeText={this.onCurrPassChange.bind(this)}
								/>
								
								<Text style={style.titleText}>Enter New Password </Text>
								
								<TextInput
									secureTextEntry
									placeholder="password"
									value={this.state.new_password}
									autoCorrect={false}
									autoCapitalize="none"
									onChangeText={this.onNewPassChange.bind(this)}
								/>
								
								<Button title="Update Password" onPress={this.update_password.bind(this)}/>
								
								<Button
									title="Cancel"
									onPress={() => {
										this.setState({
											modalVisible: false,
											curr_password: '',
											new_password: '',
										});
									}}/>
							
									
							
								

							</View>
						</View>
					</Modal>
				
				

					<View style={{ flex: 1, backgroundColor: 'white' }}>
						<View >
							<View >
							
								<Text style={style.titleText}>
								Email
								</Text>
								
								<TextInput
									value={this.state.email}
									autoCorrect={false}
									autoCapitalize="none"
									onChangeText={this.onEmailChange.bind(this)}
								/>
							
								<Text style={style.titleText}>
								First Name
								</Text>
								<TextInput
									autoCorrect={false}
									value={this.state.firstName}
									onChangeText={this.onFirstNameChange.bind(this)}
								/>
								
								<Text style={style.titleText}>
								Last Name
								</Text>
								<TextInput
									value={this.state.lastName}
									autoCorrect={false}
									onChangeText={this.onLastNameChange.bind(this)}
								/>
								
								
								<Text style={style.titleText}> Let other users see you?</Text>
								<Switch
										onValueChange = {this.toggleSwitch_public}
										value = {this.state.isPublic}
								/>
								
								
								<Text style={style.titleText}> Receive Discounts? </Text>
								<Switch
										onValueChange = {this.toggleSwitch_discount}
										value = {this.state.isDiscount}
								/>
								
							</View>
						</View>
						
						<Button
							onPress={this.edit_password.bind(this)} 
							title={"Edit Password"}
						/>
						<Button title="Update Settings" onPress={this.update_user.bind(this)}/>
						<Button title="Logout" onPress={this.logout.bind(this)}/>


					</View>
				</ScrollView>
			);
		}
	}
	
	
	logout(){
	
		axios
			.get('/auth/logout/')
			.then(response => {
				axios.defaults.headers.common.Authorization = '';
				AsyncStorage.clear()
				Actions.auth()
			})
			.catch(error =>  {
				Alert.alert("Unable to Logout")
				console.log(error)
			});
			
	}
	
	
	edit_password(){
		this.setState({modalVisible: true});
	}
	
	update_password(){

		const payload = {} 
			payload.old_password = this.state.curr_password
			payload.new_password = this.state.new_password;
			
	//		curl -X PUT http://voluntoken.herokuapp.com/api/change_password/ -H 'Authorization: Token 08b0d41c8b81f7c72f0108adf05d8fe98f8358f2' -d 'old_password=hellcoin&new_password=johnny123'
			
			axios
				.put(`/change_password/`, payload)
				.then(response => {
					
					console.log(response.data)
					
					Alert.alert(
						'Success',
						"Password Changed",
						[
							{text: 'Ok!', onPress: () => {
								this.setState({
								modalVisible: false,
								curr_password: '',
								new_password: '',
							})}},
						],
						{cancelable: false},)

				})
				.catch(error => {
					
					
					console.log(error)
					console.log(error.response.data)
					

					
					var message = ''
					if(error.response.data.old_password){
						message = error.response.data.old_password[0]
						
					}else{
						message = error.response.data.new_password[0]
						
					}
					
					Alert.alert(
						'Ooops',
						message,
						[
							{text: 'Ok!', onPress: () => {
								this.setState({
								curr_password: '',
								new_password: '',
							})}},
						],
						{cancelable: false},
					);

				});
				
			

	}
	
	update_user() {


		this.setState({
			loading: true,
		})	

		const payload = {} 
		payload.email = this.state.email
		payload.first_name = this.state.firstName;
		payload.last_name = this.state.lastName;
		payload.is_public = this.state.isPublic;
		payload.volunteer_role = "DO";
		
		if(this.state.isDiscount){
			payload.volunteer_role = "DI";
		}
		
//		curl -X PUT http://voluntoken.herokuapp.com/api/user_settings/ -H 'Authorization: Token 08b0d41c8b81f7c72f0108adf05d8fe98f8358f2' -d 'email=fff@gmail.com'
		
		axios
			.put(`/user_settings/`, payload)
			.then(response => {
				
				this.setState({
					user : response.data,
					loading: false,
				})
				var is_public = response.data.is_public
				var is_discount = false; 
				
				if(response.data.volunteer_role === "DI"){
					is_discount = true
				}		
				this.setState({
					isPublic : is_public,
					isDiscount: is_discount,
					email: response.data.email,
					firstName: response.data.first_name,
					lastName: response.data.last_name,
				})

				Alert.alert("Updated")
				
				
			})
			.catch(error => {
				
				Alert.alert("Something went wrong")
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


export default Settings;
