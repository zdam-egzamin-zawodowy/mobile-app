import React, { useMemo, useState } from 'react';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useVariables } from 'libs/native-base';
import { Query, QueryProfessionsArgs } from 'libs/graphql';
import { QUERY_PROFESSIONS } from './queries';

import { Container, Content, Spinner } from 'native-base';
import List from './components/List/List';
import Header from './components/Header/Header';
import ModeSelector, { Mode } from './components/ModeSelector/ModeSelector';
import NetworkConnectionAlert from './components/NetworkConnectionAlert/NetworkConnectionAlert';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(Mode.All);
  const variables = useVariables();
  const { loading, data, refetch, networkStatus, error } = useQuery<
    Pick<Query, 'professions'>,
    QueryProfessionsArgs
  >(QUERY_PROFESSIONS, {
    fetchPolicy: 'cache-and-network',
    variables: { sort: ['name ASC'] },
    notifyOnNetworkStatusChange: true,
  });
  const professions = useMemo(() => {
    return (data?.professions.items ?? []).filter(
      profession => profession.qualifications.length > 0,
    );
  }, [data]);

  return (
    <Container>
      <Header onSearch={setSearch} />
      <ModeSelector mode={mode} onChangeMode={setMode} />
      {loading && professions.length === 0 ? (
        <Content padder>
          <Spinner color={variables.brandPrimary} size="large" />
        </Content>
      ) : (
        <List
          professions={professions}
          refreshing={networkStatus === NetworkStatus.refetch}
          onRefresh={refetch}
          mode={mode}
          search={search}
        />
      )}
      <NetworkConnectionAlert error={error} />
    </Container>
  );
};

export default HomeScreen;
