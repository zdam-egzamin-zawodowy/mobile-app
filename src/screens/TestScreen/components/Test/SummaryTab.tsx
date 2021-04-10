import React, { useMemo } from 'react';
import { polishPlurals } from 'polish-plurals';
import { Answer, Question } from 'libs/graphql';

import { StyleSheet } from 'react-native';
import { Button, H1, H3, Text, View } from 'native-base';
import Content from '../Content/Content';
import Alert from './Alert';

export interface SummaryTabProps {
  reviewMode: boolean;
  answers: Answer[];
  questions: Question[];
  finishTest: () => void;
}

const SummaryTab = ({
  reviewMode,
  answers,
  questions,
  finishTest,
}: SummaryTabProps) => {
  const correctAnswers = useMemo(() => {
    return answers.filter(
      (answer, index) => questions[index].correctAnswer === answer,
    ).length;
  }, [answers, questions]);
  const total = questions.length;

  return (
    <Content>
      {reviewMode ? (
        <View>
          <Alert
            title="Pamiętaj!"
            description="Po zakończeniu testu możesz wrócić do pytań i sprawdzić gdzie zrobiłeś błąd."
            style={styles.mb}
          />
          <H1 style={[styles.textAlignCenter]}>
            Twój wynik: {Math.ceil((correctAnswers / total) * 100)}%
          </H1>
          <H3 style={[styles.textAlignCenter, styles.mb]}>
            Poprawnie odpowiedziałeś na {correctAnswers}{' '}
            {polishPlurals('pytanie', 'pytania', 'pytań', correctAnswers)} z{' '}
            {total}.
          </H3>
          <Button full>
            <Text>Spróbuj ponownie</Text>
          </Button>
        </View>
      ) : (
        <View>
          <Button full onPress={finishTest}>
            <Text>Zakończ test</Text>
          </Button>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  textAlignCenter: {
    textAlign: 'center',
  },
  mb: {
    marginBottom: 15,
  },
});

export default SummaryTab;
