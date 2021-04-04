import React, { useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import { AppStackParamList, Screen } from 'config/routing';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen';

const Stack = createStackNavigator<AppStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AppScreens = () => (
  <AppStack.Navigator
    screenOptions={{ animationEnabled: false, headerShown: false }}
  >
    <Stack.Screen name={Screen.Home} component={HomeScreen} />
  </AppStack.Navigator>
);

export default function Navigation() {
  const routeNameRef = useRef<string>('');
  const navigationRef = useRef<NavigationContainerRef>(null);

  const logScreenView = (route: string) => {
    return analytics().logScreenView({
      screen_name: route,
      screen_class: route,
    });
  };

  const handleReady = () => {
    logScreenView(navigationRef.current?.getCurrentRoute()?.name ?? '');
  };

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      navigationRef.current?.getCurrentRoute()?.name ?? '';

    if (previousRouteName !== currentRouteName) {
      logScreenView(currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={handleReady}
      onStateChange={handleStateChange}
    >
      <AppScreens />
    </NavigationContainer>
  );
}
