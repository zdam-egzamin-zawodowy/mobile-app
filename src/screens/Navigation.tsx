import React from 'react';
import { AppStackParamList, Screen } from 'config/routing';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen/HomeScreen';
import TestScreen from './TestScreen/TestScreen';

const Stack = createStackNavigator<AppStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AppScreens = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Screen.HOME} component={HomeScreen} />
    <Stack.Screen name={Screen.TEST} component={TestScreen} />
  </AppStack.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppScreens />
    </NavigationContainer>
  );
};

export default Navigation;
