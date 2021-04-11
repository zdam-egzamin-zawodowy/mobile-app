import React, { useState } from 'react';
import { Question as QuestionT, Answer } from 'libs/graphql';

import { ScrollableTab, Tab, Tabs } from 'native-base';
import Question from './Question';
import SummaryTab from './SummaryTab';

export interface TestProps {
  questions: QuestionT[];
  onReset: () => void;
}

const Test = ({ questions, onReset }: TestProps) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>(
    new Array(questions.length).fill(''),
  );

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

  return (
    <Tabs
      renderTabBar={(props: any) => {
        props.tabStyle = Object.create(props.tabStyle);
        return <ScrollableTab {...props} />;
      }}
      prerenderingSiblingsNumber={3}
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
          finishTest={() => setReviewMode(true)}
        />
      </Tab>
    </Tabs>
  );
};

export default Test;
