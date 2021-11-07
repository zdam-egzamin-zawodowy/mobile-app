import React, { Fragment } from 'react';
import Config from 'react-native-config';
import { Answer, Question as QuestionT } from 'libs/graphql';
import { useVariables } from 'libs/native-base';
import buildURL from 'utils/buildURL';

import { Linking, StyleSheet } from 'react-native';
import { Button, H1, Text } from 'native-base';
import Content from '../Content/Content';
import Image from './Image';
import Alert, { AlertVariant } from './Alert';

export type QuestionProps = {
  question: QuestionT;
  reviewMode: boolean;
  selectedAnswer: Answer;
  selectAnswer: (a: Answer) => void;
};

const ANSWERS = Object.values(Answer);

const Question = ({
  question,
  selectedAnswer,
  reviewMode,
  selectAnswer,
}: QuestionProps) => {
  const variables = useVariables();

  return (
    <Content>
      {reviewMode && (
        <Alert
          title="Znalazłeś błąd w pytaniu?"
          style={styles.mb}
          actions={
            <Button
              dark
              danger
              onPress={() =>
                Linking.openURL(buildURL('email', Config.CONTACT_EMAIL))
              }
            >
              <Text>Zgłoś go.</Text>
            </Button>
          }
        />
      )}
      {question.from && <Text note>{question.from}</Text>}
      <H1 style={styles.mb}>{question.content}</H1>
      {question.image ? (
        <Image
          path={question.image + '?' + new Date(question.updatedAt).getTime()}
          style={styles.mb}
        />
      ) : null}
      {reviewMode && (
        <Fragment>
          {!selectedAnswer ? (
            <Alert
              title="W tym pytaniu nie wybrałeś żadnej odpowiedzi."
              variant={AlertVariant.Warning}
              style={styles.mb}
            />
          ) : null}
          {question.explanation ? (
            <Alert
              title="Wyjaśnienie"
              description={question.explanation}
              style={styles.mb}
            />
          ) : null}
        </Fragment>
      )}
      {ANSWERS.map((answer, index) => {
        const upper = answer.toUpperCase();
        const image = question[
          `answer${upper}Image` as keyof QuestionT
        ] as string;
        const answerContent = question[
          `answer${upper}` as keyof QuestionT
        ] as string;
        const isCorrect = answer === question.correctAnswer;
        const isSelected = selectedAnswer === answer;
        return (
          <Button
            key={answer}
            style={[
              index + 1 === ANSWERS.length ? undefined : styles.mb,
              styles.button,
              { minHeight: variables.buttonHeightNormal },
            ]}
            success={reviewMode && isCorrect}
            danger={reviewMode && isSelected && !isCorrect}
            bordered={reviewMode ? !isSelected && !isCorrect : !isSelected}
            full
            vertical
            onPress={() => selectAnswer(answer)}
          >
            <Text style={styles.answerContent} uppercase={false}>
              {upper}. {answerContent}
            </Text>
            {image ? <Image path={image} style={styles.answerImage} /> : null}
          </Button>
        );
      })}
    </Content>
  );
};

const styles = StyleSheet.create({
  mb: {
    marginBottom: 15,
  },
  button: {
    height: 'auto',
  },
  answerContent: {
    alignSelf: 'flex-start',
  },
  answerImage: {
    marginTop: 5,
  },
});

export default Question;
