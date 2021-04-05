import React from 'react';
import { polishPlurals } from 'polish-plurals';
import { NetworkStatus, useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { useVariables } from 'libs/native-base';
import { Query, Scalars } from 'libs/graphql';
import { AppStackParamList, Screen } from 'config/routing';
import { QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS_QUALIFICATION } from './queries';

import { Container, Spinner } from 'native-base';
import QualificationNotFound from './components/QualificationNotFound/QualificationNotFound';
import Header from './components/Header/Header';
import Suggestions from './components/Suggestions/Suggestions';
import Test from './components/Test/Test';
import Content from './components/Content/Content';

export interface TestScreenProps {
  route: RouteProp<AppStackParamList, Screen.Test>;
}

type QueryGenerateTestSimilarQualificationsQualificationArgs = {
  limitTest: Scalars['Int'];
  qualificationID: Scalars['ID'];
  limitSuggestions: Scalars['Int'];
};

const TestScreen = ({ route }: TestScreenProps) => {
  const variables = useVariables();
  const { data, loading, networkStatus } = useQuery<
    Pick<Query, 'qualification' | 'generateTest' | 'similarQualifications'>,
    QueryGenerateTestSimilarQualificationsQualificationArgs
  >(QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS_QUALIFICATION, {
    fetchPolicy: 'network-only',
    variables: {
      qualificationID: route.params.qualificationID,
      limitTest: route.params.limit,
      limitSuggestions: 12,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Container>
      <Header
        title={`Test ${route.params.limit} ${polishPlurals(
          'pytanie',
          'pytania',
          'pytań',
          route.params.limit,
        )}`}
      />
      {loading || networkStatus === NetworkStatus.refetch ? (
        <Content>
          <Spinner color={variables.brandPrimary} />
        </Content>
      ) : data?.qualification ? (
        data?.generateTest?.length ? (
          <Test questions={data.generateTest} />
        ) : (
          <Suggestions
            qualifications={data?.similarQualifications.items ?? []}
          />
        )
      ) : (
        <QualificationNotFound />
      )}
    </Container>
  );
};

export default TestScreen;
