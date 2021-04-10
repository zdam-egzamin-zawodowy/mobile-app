import { gql } from '@apollo/client/core';

export const QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS_QUALIFICATION = gql`
  query generateTestAndGetSimilarQualifications(
    $limitTest: Int!
    $qualificationID: ID!
    $limitSuggestions: Int!
  ) {
    qualification(id: $qualificationID) {
      id
      slug
      name
      code
      formula
    }
    generateTest(limit: $limitTest, qualificationIDs: [$qualificationID]) {
      id
      from
      content
      explanation
      image
      answerA
      answerAImage
      answerB
      answerBImage
      answerC
      answerCImage
      answerD
      answerDImage
      correctAnswer
      updatedAt
    }
    similarQualifications(
      limit: $limitSuggestions
      qualificationID: $qualificationID
    ) {
      items {
        id
        name
        code
        slug
        formula
      }
    }
  }
`;
