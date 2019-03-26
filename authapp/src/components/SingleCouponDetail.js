import React, { Component } from 'react';
import { Modal, TouchableHighlight, Alert, View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { Actions } from 'react-native-router-flux';

import CodePin from 'react-native-pin-code';
import PinView from 'react-native-pin-view'
import CodeInput from 'react-native-code-input';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

class SingleCouponDetail extends Component {

	constructor(props) {
		super(props);
		console.log(this.props)

		this.state = {
			modalVisible: false,
						
		}
	}
	
	state = {
		code: '',
		password: '',
	};

	pinInput = React.createRef();
	

	render () {

		const { code, password } = this.state;
		var description; 
		
		if(this.props.obj.is_donation){
			description =   
			
			<View> 
				<Text> Token Cost: {this.props.obj.token_cost} {"\n"} Donation Pledge: {this.props.obj.donation_val} </Text>
				
				<Button
					onPress={this.use_coupon_donation.bind(this)} 
					title={"Confirm Donate"}
				/>			
				
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
															
							<Text style={style.titleText}>Show to Business </Text>
							<Text style={style.titleText}>Please Enter Pin </Text>

							
							<SmoothPinCodeInput
								ref={this.pinInput}
								value={code}
								onTextChange={code => this.setState({ code })}
								onFulfill={this._checkCode_diff}
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
				
				
				
				
				
			</View>

			
		}else{
			description =  
			
			<View>
			<Text> Token Cost: {this.props.obj.token_cost} </Text>
			
			<Button
				onPress={this.use_coupon.bind(this)} 
				title={"Confirm Use"}
			/>
			
			</View>
		}
		
		 
		
		
		return (
			<ScrollView>
			<View style={style.small_space}>
											</View>
											
			<Text style={style.titleText}> {this.props.obj.name} </Text>
			<Text> {this.props.obj.description} </Text>
			
			{description}
					

			
			
			</ScrollView>
		);
	}
	
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	
	
	use_coupon_donation(){
		this.setModalVisible(true)
		
	}
	
	_checkCode_diff = (code) => {
			
			var obj_id = this.props.obj.id 
			var pin = code
//			var url = "/make_transcation_donation/"
			var url = "/make_transaction_donation/"
							
			payload = {coupon_id: obj_id, pin_try: pin}
			axios
				.post(url, payload)
				.then(response => {
					
					if(response.data.success){
						this.setState({ code: '' })
						
						console.log("complete")
						Alert.alert(
							'Successs',
							'You donated!',
							[
								{text: 'Ok!', onPress: () => this.goBack()},
							],
							{cancelable: false},
						);

					}else{
						
						console.log("we got some problems")
						
						if(response.data.error_message === "insufficient funds"){
							console.log("Insufficient Funds")
								
							Alert.alert(
								'Ooops',
								'You have insufficient funds',
								[
									{text: 'Ok!', onPress: () => this.goBack()},
								],
								{cancelable: false},
							);
							
						}else{
							
							console.log("Incorrect Code")									
							this.pinInput.current.shake()
								.then(() => this.setState({ code: '' }));

						}
					}
					
				})
				.catch(error => {
					
					console.log(error)
					
				});


		}
	
	use_coupon(){
	
	var obj_id = this.props.obj.id 	
	payload = {coupon_id: obj_id}
//	make_transcation_discount
	axios
		.post(`/make_transaction_discount/`, payload)
		.then(response => {
			
			if(response.data.success){
				console.log("complete")
				

				var message = this.props.obj.name + "\n" 
				message += this.props.obj.description + "\n"
				message += "TIME STAMP" + "\n"
				message += new Date().toLocaleString()
				 
				Alert.alert(
					'Successs',
					'Show this to cashier: \n' + message,
					[
						{text: 'Done!', onPress: () => this.goBack()},
					],
					{cancelable: false},
				);

				
			}else{
				
				if(response.data.error_message === "insufficient funds"){
					
					console.log("insufficent")
					Alert.alert(
						'Ooops',
						'You have insufficient funds',
						[
							{text: 'Ok!', onPress: () => this.goBack()},
						],
						{cancelable: false},
					);
					
				}else{
					console.log("not donation")
					
					Alert.alert(
						'Ooops',
						'Coupon no-longer exists',
						[
							{text: 'Ok!', onPress: () => this.goBack()},
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

export default SingleCouponDetail;



