import React, { Component } from 'react';
import { Modal, TouchableHighlight, Alert, View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import {Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';
import CodePin from 'react-native-pin-code';
import PinView from 'react-native-pin-view'
import CodeInput from 'react-native-code-input';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input'


class CheckInOutDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			event_id: this.props.obj.id, 
			pressed_check_in: false,
			 modalVisible: false,				
		}
	}
	
	state = {
		code: '',
		password: '',
	};
	pinInput = React.createRef();

	_checkCode = (code) => {
		
		//checkin
		var url = "/make_checkin/"
		
		if(this.state.pressed_check_in == false){
			url = "/make_checkout/"
		}
		
		var obj_id = this.props.obj.id 
		var payload = {event_id: obj_id, pin_try: code}
		
		axios
			.post(url, payload)
			.then(response => {
				
				if(response.data.success){
					console.log("complete")
					console.log(response.data)
					
					if(this.state.pressed_check_in == true){
						
						Alert.alert(
							'Checked In',
							message,
							[
								{text: 'Ok!', onPress: () => this.goBack()},
							],
							{cancelable: false},
						);

						
					}else{
						
						Alert.alert(
							'Checked Out',
							message,
							[
								{text: 'Ok!', onPress: () => this.goBack()},
							],
							{cancelable: false},
						);

					
					}
										
				}else{
					
					if(response.data.error_message === "incorrect pin"){
						
						this.pinInput.current.shake()
							.then(() => this.setState({ code: '' }));
						
					}else{
						
						var message = response.data.error_message						
						Alert.alert(
							'Oops',
							message,
							[
								{text: 'Ok', onPress: () => this.goBack()},
							],
							{cancelable: false},
						);
						
					}

				}
			})
			.catch(error => {
				
				console.log(error)
				
			});

	}
	

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	
	render () {
		
		const { code, password } = this.state;
					
		let has_checked_in = this.state.has_checked_in;
		let button; 
		
		
			buttons = 
			(<View>
					<Button onPress={this.check_in.bind(this)} title={"Check in"}/>
					<Button onPress={this.check_out.bind(this)} title={"Check out"}/>
			</View>)
		
		

		return (
			<ScrollView>
			
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

						<Text style={style.titleText}>Show to NGO </Text>
						<Text style={style.titleText}>Please Enter Pin</Text>
						
						<SmoothPinCodeInput
							ref={this.pinInput}
							value={code}
							onTextChange={code => this.setState({ code })}
							onFulfill={this._checkCode}
							onBackspace={this._focusePrevInput}
							/>
							
							<View style={style.small_space}>
							</View>
							
							<Button
								title="Cancel"
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}/>
	
							
							
					</View>
				</View>
			</Modal>

			<View style={style.small_space}>
			</View>
			<Text style={style.titleText}> {this.props.obj.name} </Text>
			<Text >			
				{new Intl.DateTimeFormat('en-US', { 
					year: 'numeric', 
					day: '2-digit', 
					month: 'long', 
					hour:'2-digit',
					minute: '2-digit',
				}).format(new Date(this.props.obj.start_time))}	
			</Text>
			<Text>			
				{new Intl.DateTimeFormat('en-GB', { 
					year: 'numeric', 
					day: '2-digit',
					month: 'long', 
					hour:'2-digit',
					minute: '2-digit',
				}).format(new Date(this.props.obj.end_time))}	
			</Text>
			<Text> {this.props.obj.description} </Text>
			

			{buttons}
			
		

			
			</ScrollView>
		);
		
	}
	
	check_in(){
		this.setState({pressed_check_in: true})
		this.setModalVisible(true)	
	}
	
	check_out(){
		this.setState({pressed_check_in: false})
		this.setModalVisible(true)		
	}

	goBack () {
		this.setState({ modalVisible: false})
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
export default CheckInOutDetail;
