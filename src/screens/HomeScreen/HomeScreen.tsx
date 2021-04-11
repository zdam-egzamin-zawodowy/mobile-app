import React, { useMemo, useState } from 'react';
import { sortBy } from 'lodash';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useUpdateEffect } from 'react-use';
import { useVariables } from 'libs/native-base';
import { useSavedQualifications } from 'libs/savedqualifications';
import { Query, QueryProfessionsArgs } from 'libs/graphql';
import { EMAIL } from 'config/app';
import { QUERY_PROFESSIONS } from './queries';
import buildURL from 'utils/buildURL';

import { Alert, Linking } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import Professions from './components/Professions/Professions';
import Header from './components/Header/Header';
import ModeSelector, { Mode } from './components/ModeSelector/ModeSelector';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(Mode.All);
  const variables = useVariables();
  const { isSaved } = useSavedQualifications();
  const { loading, data, refetch, networkStatus, error } = useQuery<
    Pick<Query, 'professions'>,
    QueryProfessionsArgs
  >(QUERY_PROFESSIONS, {
    fetchPolicy: 'cache-and-network',
    variables: { sort: ['name ASC'] },
    notifyOnNetworkStatusChange: true,
  });
  const professions = useMemo(() => {
    return (data?.professions.items ?? [])
      .filter(profession => profession.qualifications.length > 0)
      .map(profession => ({
        ...profession,
        qualifications: sortBy(profession.qualifications, ['formula', 'code']),
      }));
  }, [data]);
  const filteredProfessions = useMemo(() => {
    if (!search && mode === Mode.All) {
      return professions;
    }
    return professions
      .map(profession => ({
        ...profession,
        qualifications: profession.qualifications.filter(
          qualification =>
            (!search ||
              qualification.name.toLowerCase().includes(search) ||
              qualification.code.toLowerCase().includes(search)) &&
            (mode === Mode.All || isSaved(qualification.id)),
        ),
      }))
      .filter(profession => profession.qualifications.length > 0);
  }, [search, professions, mode, isSaved]);
  useUpdateEffect(() => {
    if (error && error.networkError) {
      Alert.alert(
        'Problem z połączeniem',
        'Prosimy o sprawdzenie połączenia z internetem / spróbowanie ponownie później. Przepraszamy za utrudnienia.',
        [
          {
            text: 'Zgłoś problem',
            onPress: () => Linking.openURL(buildURL('mail', EMAIL)),
          },
          { text: 'OK' },
        ],
      );
    }
  }, [error]);

  return (
    <Container>
      <Header onSearch={setSearch} />
      <ModeSelector mode={mode} onChangeMode={setMode} />
      {loading && professions.length === 0 ? (
        <Content padder>
          <Spinner color={variables.brandPrimary} size="large" />
        </Content>
      ) : (
        <Professions
          professions={filteredProfessions}
          refreshing={networkStatus === NetworkStatus.refetch}
          onRefresh={refetch}
        />
      )}
    </Container>
  );
};

export default HomeScreen;
