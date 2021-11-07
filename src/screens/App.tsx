import 'react-native-gesture-handler';
import React, { useEffect, useMemo } from 'react';
import * as Sentry from '@sentry/react-native';
import { ApolloProvider } from '@apollo/client';
import RNBootSplash from 'react-native-bootsplash';
import { Root, StyleProvider } from 'native-base';
import { createClient } from 'libs/graphql';
import Config from 'react-native-config';
import Navigation from './Navigation';
import { createTheme, variables } from '../libs/native-base';
import { SavedQualificationsProvider } from '../libs/savedqualifications';
import initSentry from '../libs/sentry/initSentry';

initSentry();

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
    return createClient(Config.API_URI);
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

export default Sentry.wrap(App);
