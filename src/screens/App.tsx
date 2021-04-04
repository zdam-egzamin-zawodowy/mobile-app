import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import RNBootSplash from 'react-native-bootsplash';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { createClient } from 'libs/graphql';
import { API_URI } from 'config/api';
import Navigation from './Navigation';

const App = () => {
  const client = useRef(createClient(API_URI)).current;
  const theme = useRef(
    extendTheme({
      colors: {
        // Add new color
        primary: {
          200: '#448AFF',
        },
      },
    }),
  ).current;
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    </NativeBaseProvider>
  );
};

export default App;
