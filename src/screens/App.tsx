import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import RNBootSplash from 'react-native-bootsplash';
import { StyleProvider } from 'native-base';
import { createClient } from 'libs/graphql';
import { API_URI } from 'config/api';
import Navigation from './Navigation';
import { createTheme, variables } from '../libs/native-base';
import { SavedQualificationsProvider } from '../libs/savedqualifications';

const BaseApp = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return <Navigation />;
};

const App = () => {
  const theme = useRef(createTheme(variables)).current;
  const client = useRef(createClient(API_URI)).current;

  return (
    <ApolloProvider client={client}>
      <StyleProvider style={theme}>
        <SavedQualificationsProvider>
          <BaseApp />
        </SavedQualificationsProvider>
      </StyleProvider>
    </ApolloProvider>
  );
};

export default App;
