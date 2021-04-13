import React, { useEffect, useMemo, useState } from 'react';
import analytics from '@react-native-firebase/analytics';
import { Question as QuestionT, Answer, Qualification } from 'libs/graphql';
import { Event } from 'config/analytics';

import { ScrollableTab, Tab, Tabs } from 'native-base';
import Question from './Question';
import SummaryTab from './SummaryTab';

export interface TestProps {
  questions: QuestionT[];
  onReset: () => void;
  qualification: Qualification;
}

const Test = ({ questions, onReset, qualification }: TestProps) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>(
    new Array(questions.length).fill(''),
  );

  const analyticsParams = useMemo(
    () => ({
      qualificationID: qualification.id.toString(),
      questions: questions.length.toString(),
    }),
    [qualification, questions],
  );

  useEffect(() => {
    analytics().logEvent(Event.StartTest, analyticsParams);
  }, [analyticsParams]);

  const createSelectAnswerHandler = (index: number) => (answer: Answer) => {
    if (reviewMode) {
      return;
    }
    setSelectedAnswers(answers =>
      answers.map((otherAnswer, index2) =>
        index === index2 ? answer : otherAnswer,
      ),
    );
  };

  const handleFinishTest = () => {
    setReviewMode(true);
    analytics().logEvent(Event.FinishTest, analyticsParams);
  };

  return (
    <Tabs
      renderTabBar={(props: any) => {
        props.tabStyle = Object.create(props.tabStyle);
        return <ScrollableTab {...props} />;
      }}
      prerenderingSiblingsNumber={1}
    >
      {questions.map((question, index) => {
        const color =
          selectedAnswers[index] === question.correctAnswer
            ? 'lightgreen'
            : 'red';
        const textStyleReviewMode = {
          color,
        };
        return (
          <Tab
            key={question.id}
            heading={`Pytanie ${index + 1}`}
            textStyle={reviewMode ? textStyleReviewMode : []}
            activeTextStyle={reviewMode ? textStyleReviewMode : []}
          >
            <Question
              question={question}
              reviewMode={reviewMode}
              selectedAnswer={selectedAnswers[index]}
              selectAnswer={createSelectAnswerHandler(index)}
            />
          </Tab>
        );
      })}
      <Tab heading="Koniec">
        <SummaryTab
          reviewMode={reviewMode}
          answers={selectedAnswers}
          questions={questions}
          resetTest={onReset}
          finishTest={handleFinishTest}
        />
      </Tab>
    </Tabs>
  );
};

export default Test;
