import React from 'react';
import { Question as QuestionT, Answer } from 'libs/graphql';

import { StyleSheet } from 'react-native';
import { Button, H1, Text } from 'native-base';
import Content from '../Content/Content';
import Image from './Image';

export interface QuestionProps {
  question: QuestionT;
  reviewMode: boolean;
  selectedAnswer: Answer;
  selectAnswer: (a: Answer) => void;
}

const ANSWERS = Object.values(Answer);

const Question = ({
  question,
  selectedAnswer,
  reviewMode,
  selectAnswer,
}: QuestionProps) => {
  return (
    <Content>
      {question.from && <Text note>{question.from}</Text>}
      <H1 style={styles.mb}>{question.content}</H1>
      {question.image ? (
        <Image
          path={question.image + '?' + new Date(question.updatedAt).getTime()}
          style={styles.mb}
        />
      ) : null}
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
