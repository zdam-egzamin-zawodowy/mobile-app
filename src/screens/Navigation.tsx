import React, { useRef } from 'react';
import { routingInstrumentation } from '../libs/sentry/initSentry';
import { AppStackParamList, Screen } from 'config/routing';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen/HomeScreen';
import TestScreen from './TestScreen/TestScreen';

const Stack = createStackNavigator<AppStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AppScreens = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.HOME} component={HomeScreen} />
      <Stack.Screen name={Screen.TEST} component={TestScreen} />
    </AppStack.Navigator>
  );
};

const Navigation = () => {
  const navigation = useRef<NavigationContainerRef>(null);

  const handleReady = () => {
    routingInstrumentation.registerNavigationContainer(navigation);
  };

  return (
    <NavigationContainer ref={navigation} onReady={handleReady}>
      <AppScreens />
    </NavigationContainer>
  );
};

export default Navigation;
