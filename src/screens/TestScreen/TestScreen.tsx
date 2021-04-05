import React from 'react';
import { polishPlurals } from 'polish-plurals';
import { NetworkStatus, useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { useVariables } from 'libs/native-base';
import { Query, Scalars } from 'libs/graphql';
import { AppStackParamList, Screen } from 'config/routing';
import { QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS_QUALIFICATION } from './queries';

import { StyleSheet } from 'react-native';
import { Container, Content, Spinner, View } from 'native-base';
import QualificationNotFound from './components/QualificationNotFound/QualificationNotFound';
import Header from './components/Header/Header';
import Suggestions from './components/Suggestions/Suggestions';

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
      <Content padder contentContainerStyle={styles.contentContainer}>
        {loading || networkStatus === NetworkStatus.refetch ? (
          <Spinner color={variables.brandPrimary} />
        ) : data?.qualification ? (
          <Suggestions
            qualifications={data?.similarQualifications.items ?? []}
          />
        ) : (
          <QualificationNotFound />
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});

export default TestScreen;
