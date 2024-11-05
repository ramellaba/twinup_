import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

//Import Screens
import SignIn from './assets/src/Account/SignIn';
import SignUp from './assets/src/Account/SignUp';
import SignUpConfirmation from './assets/src/Account/SignUpConfirmation';
import ForgotPassword from './assets/src/Account/ForgotPassword';
import Facility from './assets/src/Facility/Facility';
import Entity from './assets/src/Entity/Entity';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpConfirmation" component={SignUpConfirmation} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Facility" component={Facility} />
        <Stack.Screen name="Entity" component={Entity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;