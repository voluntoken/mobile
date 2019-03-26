import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';


class Events extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: '',
			loading: true
		};
	}
	
	componentDidMount () {
			
		axios
			.get(`/get_all_ngo_event/`+this.props.obj.id)
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
					<Text> {this.props.obj.name} </Text>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
			
		} else { 
			content = this.state.data.map((event, index) => {
				return (
					<Card key={index}>
						<View>
							<Text> {event.name}: {event.description} </Text>
								<Button
									onPress={() => Actions.single_event_detail({obj: event})} 
									title={"More"}
								/>
							
						</View>
					</Card>
				);
			});
		}

		return (
			<ScrollView>
				<View style={style.small_space}>
				</View>
				
				<Text  style={style.titleText}> {this.props.obj.name} </Text>
				{content}

			</ScrollView>
		);
	}
	
//	<Button
//		onPress={this.goBack} 
//		title={"Back"}
//	/>
	
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

export default Events;