import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import RNBootSplash from 'react-native-bootsplash';
import { createClient } from 'libs/graphql';
import { API_URI } from 'config/api';
import Navigation from './Navigation';

const App = () => {
  const client = useRef(createClient(API_URI)).current;
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
};

export default App;
