import React, { useMemo } from 'react';
import { sortBy } from 'lodash';
import { useQuery } from '@apollo/client';
import { useVariables } from 'libs/native-base';
import { Query, QueryProfessionsArgs } from 'libs/graphql';
import { QUERY_PROFESSIONS } from './queries';

import { Container, Spinner, View } from 'native-base';
import Professions from './components/Professions/Professions';

const HomeScreen = () => {
  const variables = useVariables();
  const { loading, data } = useQuery<
    Pick<Query, 'professions'>,
    QueryProfessionsArgs
  >(QUERY_PROFESSIONS, {
    fetchPolicy: 'cache-and-network',
    variables: { sort: ['name ASC'] },
  });
  const professions = useMemo(() => {
    return (data?.professions.items ?? []).map(profession => ({
      ...profession,
      qualifications: sortBy(profession.qualifications, ['formula', 'code']),
    }));
  }, [data]);

  return (
    <Container>
      <View>
        {loading && professions.length === 0 ? (
          <Spinner color={variables.brandPrimary} />
        ) : (
          <Professions professions={professions} />
        )}
      </View>
    </Container>
  );
};

export default HomeScreen;
