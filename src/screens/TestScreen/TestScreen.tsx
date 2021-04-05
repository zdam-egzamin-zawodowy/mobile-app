import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Query, Scalars } from 'libs/graphql';
import { AppStackParamList, Screen } from 'config/routing';
import { QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS_QUALIFICATION } from './queries';

import { Container, Content, H1 } from 'native-base';

export interface TestScreenProps {
  route: RouteProp<AppStackParamList, Screen.Test>;
}

type QueryGenerateTestSimilarQualificationsQualificationArgs = {
  limitTest: Scalars['Int'];
  qualificationID: Scalars['ID'];
  limitSuggestions: Scalars['Int'];
};

const TestScreen = ({ route }: TestScreenProps) => {
  const { data, loading } = useQuery<
    Pick<Query, 'qualification' | 'generateTest' | 'similarQualifications'>,
    QueryGenerateTestSimilarQualificationsQualificationArgs
  >(QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS_QUALIFICATION, {
    fetchPolicy: 'network-only',
    variables: {
      qualificationID: route.params.qualificationID,
      limitTest: route.params.limit,
      limitSuggestions: 6,
    },
  });
  console.log(data);
  return (
    <Container>
      <Content>
        <H1>TestScreen</H1>
      </Content>
    </Container>
  );
};

export default TestScreen;
