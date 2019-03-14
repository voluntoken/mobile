// src/Router.js

import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Coupons from './components/Coupons';
import DetailPage from './components/DetailPage'
import CouponPage from './components/CouponPage'




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
					<Scene
						title="Home"
						key="home"
						component={Home}
						initial
					/>
					<Scene
						title="Events"
						key="event"
						component={Home}
					/>
					<Scene
						title="Coupons"
						key="coupon"
						component={Coupons}
					/>
				</Stack>
				<Stack
					key="detail_view"
					type="reset"
					navigationBarStyle={style.navBarStyle}
					titleStyle={style.titleStyle}
					>
					<Scene
						title="Event"
						key="event_detail"
						component={DetailPage}
						initial
					/>
				</Stack>
				<Stack
					key="coupon_view"
					type="reset"
					navigationBarStyle={style.navBarStyle}
					titleStyle={style.titleStyle}
					>
					<Scene
						title="Coupon"
						key="coupon_detail"
						component={CouponPage}
						initial
					/>
				</Stack>


			</Stack>
		</Router>
	);
};




export default RouterComponent;
