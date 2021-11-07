import React, { useState } from 'react';
import { Answer, Qualification, Question as QuestionT } from 'libs/graphql';

import { ScrollableTab, Tab, Tabs } from 'native-base';
import Question from './Question';
import SummaryTab from './SummaryTab';

export type TestProps = {
  questions: QuestionT[];
  onReset: () => void;
  qualification: Qualification;
};

const Test = ({ questions, onReset, qualification }: TestProps) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>(
    new Array(questions.length).fill(''),
  );

  const handleSelectAnswer = (index: number, answer: Answer) => {
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
            textStyle={reviewMode ? textStyleReviewMode : undefined}
            activeTextStyle={reviewMode ? textStyleReviewMode : undefined}
          >
            <Question
              question={question}
              reviewMode={reviewMode}
              selectedAnswer={selectedAnswers[index]}
              selectAnswer={answer => handleSelectAnswer(index, answer)}
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
          qualificationID={qualification.id}
        />
      </Tab>
    </Tabs>
  );
};

export default Test;
