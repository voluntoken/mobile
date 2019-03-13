import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

 import { Actions } from 'react-native-router-flux';


class DetailPage extends Component {
	render(){
		return (
			<View>
				<Text> oh boy </Text>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}		
}

export default DetailPage;