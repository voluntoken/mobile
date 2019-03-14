import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';


class DetailPage extends Component {
	render(){
		return (
			<View>
				<Text> Event Detail Page </Text>
				<Text> {this.props.obj.name} </Text>
				<Button onPress={this.goBack}>
					<Text> More </Text>
				</Button>
			</View>
		);
	}
	
	goBack () {
		Actions.event();
	} 		
}

export default DetailPage;