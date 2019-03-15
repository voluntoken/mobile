// src/Router.js 

import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import NGO from './components/NGO';
import Business from './components/Business';

import Events from './components/Events'
import Coupons from './components/Coupons'

import SingleEventDetail from './components/SingleEventDetail'
import SingleCouponDetail from './components/SingleCouponDetail'

import CheckInOutDetail from './components/CheckInOutDetail'


import { StyleSheet, StatusBar } from 'react-native';


const style = StyleSheet.create({
	navBarStyle: {
		top: StatusBar.currentHeight
	},
	titleStyle: {
		flexDirection: 'row',
		width: 200
	}
});


const RouterComponent = () => {
	return (
		<Router>
			<Stack hideNavBar key="root">
				<Stack
					key="auth"
					type="reset"
					navigationBarStyle={style.navBarStyle}
					titleStyle={style.titleStyle}
					>
					<Scene
						title="Sign In"
						key="login"
						component={Login}
						initial
					/>
					<Scene
						title="Register"
						key="register"
						component={Register}
					/>  
				</Stack>
				<Stack
					key="main"
					tabs={true}
					tabBarStyle={{ backgroundColor: '#FFFFFF' }}
					type="reset"
					navigationBarStyle={style.navBarStyle}
					titleStyle={style.titleStyle}
					>
					
					<Stack
					
						key="Home"
						type="reset"
						navigationBarStyle={style.navBarStyle}
						titleStyle={style.titleStyle}
						>
						<Scene
							title="Home"
							key="home"
							component={Home}
							onEnter={this.onEnterHome}
							initial
						/>
						<Scene
							title="See Events"
							key="check_in_out_detail"
							component={CheckInOutDetail}
						/>
					</Stack>
					

					
					<Stack
						key="NGO"
						type="reset"
						navigationBarStyle={style.navBarStyle}
						titleStyle={style.titleStyle}
						>
						<Scene
							title="NGOs"
							key="ngo"
							component={NGO}
							initial
						/>
						<Scene
							title="See Events"
							key="events"
							component={Events}
						/>
						<Scene
							title="Event"
							key="single_event_detail"
							component={SingleEventDetail}
						/>
					</Stack>
					
					<Stack
						key="Business"
						type="reset"
						navigationBarStyle={style.navBarStyle}
						titleStyle={style.titleStyle}
						>
						<Scene
							title="Businesses"
							key="business"
							component={Business}
							initial
						/>
						
						<Scene
							title="See Coupons"
							key="coupons"
							component={Coupons}
						/>
						<Scene
							title="Coupon"
							key="single_coupon_detail"
							component={SingleCouponDetail}
						/>
					</Stack>


					
				</Stack>

				
			</Stack>
		</Router>
	);
};



export default RouterComponent;
