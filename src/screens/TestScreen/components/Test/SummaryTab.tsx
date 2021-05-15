import React, { useMemo } from 'react';
import { polishPlurals } from 'polish-plurals';
import { useSavedQualifications } from 'libs/savedqualifications';
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
  resetTest: () => void;
  qualificationID: number;
}

const SummaryTab = ({
  reviewMode,
  answers,
  questions,
  finishTest,
  resetTest,
  qualificationID,
}: SummaryTabProps) => {
  const { isSaved, saveQualification } = useSavedQualifications();
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
            Twój wynik: {(correctAnswers / total) * 100}%
          </H1>
          <H3 style={[styles.textAlignCenter, styles.mb]}>
            Poprawnie odpowiedziałeś na {correctAnswers}{' '}
            {polishPlurals('pytanie', 'pytania', 'pytań', correctAnswers)} z{' '}
            {total}.
          </H3>
          {!isSaved(qualificationID) && (
            <Button
              full
              style={styles.smallMB}
              onPress={() => saveQualification(qualificationID, true)}
            >
              <Text>Zapisz kwalifikację</Text>
            </Button>
          )}
          <Button full onPress={resetTest}>
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
  smallMB: {
    marginBottom: 5,
  },
  mb: {
    marginBottom: 15,
  },
});

export default SummaryTab;
