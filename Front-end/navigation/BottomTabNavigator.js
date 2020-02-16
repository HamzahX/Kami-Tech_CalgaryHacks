import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {TabNavigator} from 'react-navigation'

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';

const BottomTabNavigator = createBottomTabNavigator({
  //One: HomeScreen,
  //Two: AboutScreen,
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home Map',

        }
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
        tabBarLabel: 'About Us',
        }
    }
},{
    tabBarOptions:{
       activeTintColor:'#FFFFFF',
       inactiveTintColor:'#FFFFFF',
       activeBackgroundColor:'#F20121',
       inactiveBackgroundColor:'#F76074',
       safeAreaInset: {bottom: 'always', top: 'never'},
       labelStyle:{
            fontSize: 20,
            //fontFamily: Fonts.QuicksandBold,
            textAlign:'center',
            justifyContent:'center',
            marginBottom: 10
        }

    }
});

export default BottomTabNavigator;
