import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import RNBootSplash from 'react-native-bootsplash';
import { Root, StyleProvider } from 'native-base';
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
  const theme = useMemo(() => {
    return createTheme(variables);
  }, []);
  const client = useMemo(() => {
    return createClient(API_URI);
  }, []);

  return (
    <ApolloProvider client={client}>
      <StyleProvider style={theme}>
        <Root>
          <SavedQualificationsProvider>
            <BaseApp />
          </SavedQualificationsProvider>
        </Root>
      </StyleProvider>
    </ApolloProvider>
  );
};

export default App;
