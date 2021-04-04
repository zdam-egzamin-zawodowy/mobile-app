import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import RNBootSplash from 'react-native-bootsplash';
import { createClient } from 'libs/graphql';
import { API_URI } from 'config/api';
import Navigation from './Navigation';
import { StyleProvider } from 'native-base';
import { createTheme, variables } from '../libs/native-base';

const App = () => {
  const theme = useRef(createTheme(variables)).current;
  const client = useRef(createClient(API_URI)).current;
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <ApolloProvider client={client}>
      <StyleProvider style={theme}>
        <Navigation />
      </StyleProvider>
    </ApolloProvider>
  );
};

export default App;
