import { ApolloError } from '@apollo/client';
import { useUpdateEffect } from 'react-use';
import { Alert, Linking } from 'react-native';
import Config from 'react-native-config';
import buildURL from 'utils/buildURL';

export type NetworkConnectionAlertProps = {
  error?: ApolloError;
};

const NetworkConnectionAlert = ({ error }: NetworkConnectionAlertProps) => {
  useUpdateEffect(() => {
    if (!error || !error.networkError) {
      return;
    }

    Alert.alert(
      'Problem z połączeniem',
      'Prosimy o sprawdzenie połączenia z internetem / spróbowanie ponownie później. Przepraszamy za utrudnienia.',
      [
        {
          text: 'Zgłoś problem',
          onPress: () =>
            Linking.openURL(buildURL('email', Config.CONTACT_EMAIL)),
        },
        { text: 'OK' },
      ],
    );
  }, [error]);

  return null;
};

export default NetworkConnectionAlert;
