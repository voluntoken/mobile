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
			loading: true,
			user: null,
		};
	}
	
	componentDidMount () {
			
		var user_donate = true
		
		axios
			.get(`/get_user/`)
			.then(response => {
				console.log("Got User Data...")
				console.log(response.data)
				
				this.setState({user : response.data})
				
				if(response.data.volunteer_role === "DI"){
					user_donate = false 
				}
				
				if(!user_donate){
						
					axios
						.get(`/get_all_business_discount_coupon/`+this.props.obj.id)
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
						
				}else{
					
					axios
						.get(`/get_all_business_donation_coupon/`+this.props.obj.id)
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
					<Text> {this.props.obj.name} </Text>
					<Button
						onPress={this.goBack} 
						title={"Back"}
					/>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		} else { 
			content = this.state.data.map((coupon, index) => {
				return (
					<Card key={index}>
						<View>
							<Text> {coupon.name}: {coupon.description} </Text>
								<Button
									onPress={() => Actions.single_coupon_detail({obj: coupon, user: this.state.user})} 
									title={"Use"}
								/>
							
						</View>
					</Card>
				);
			});
		}

		return (
			<ScrollView>
			<Text> {this.props.obj.name} </Text>
			{content}

			</ScrollView>
		);
	}
	
	
	goBack () {
		Actions.pop();
	} 		
}

export default Coupons;