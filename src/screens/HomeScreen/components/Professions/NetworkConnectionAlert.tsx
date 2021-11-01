import { ApolloError } from '@apollo/client';
import { useUpdateEffect } from 'react-use';
import { Alert, Linking } from 'react-native';
import buildURL from 'utils/buildURL';
import { EMAIL } from 'config/app';

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
          onPress: () => Linking.openURL(buildURL('email', EMAIL)),
        },
        { text: 'OK' },
      ],
    );
  }, [error]);

  return null;
};

export default NetworkConnectionAlert;
