import React, { useMemo, useState } from 'react';
import { sortBy } from 'lodash';
import { NetworkStatus, useQuery } from '@apollo/client';
import { useVariables } from 'libs/native-base';
import { Query, QueryProfessionsArgs } from 'libs/graphql';
import { QUERY_PROFESSIONS } from './queries';

import { Container, Content, Spinner } from 'native-base';
import Professions from './components/Professions/Professions';
import Header from './components/Header/Header';
import ModeSelector, { Mode } from './components/ModeSelector/ModeSelector';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState(Mode.All);
  const variables = useVariables();
  const { loading, data, refetch, networkStatus } = useQuery<
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
    if (!search) {
      return professions;
    }
    return professions
      .map(profession => ({
        ...profession,
        qualifications: profession.qualifications.filter(
          qualification =>
            qualification.name.toLowerCase().includes(search) ||
            qualification.code.toLowerCase().includes(search),
        ),
      }))
      .filter(profession => profession.qualifications.length > 0);
  }, [search, professions]);

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
