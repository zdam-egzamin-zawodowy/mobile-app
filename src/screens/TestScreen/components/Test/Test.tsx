import React, { useRef, useState } from 'react';
import { Question as QuestionT, Answer } from 'libs/graphql';
import { useVariables } from 'libs/native-base';

import { ScrollableTab, Tab, Tabs } from 'native-base';
import Question from './Question';
import SummaryTab from './SummaryTab';

export interface TestProps {
  questions: QuestionT[];
}

const Test = ({ questions }: TestProps) => {
  const startedAtRef = useRef(new Date());
  const endedAtRef = useRef(new Date());
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>(
    new Array(questions.length).fill(''),
  );
  const variables = useVariables();

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
    >
      {questions.map((question, index) => {
        const color =
          selectedAnswers[index] === question.correctAnswer
            ? variables.buttonSuccessBg
            : variables.buttonDangerBg;
        const textStyle = {
          color,
        };
        return (
          <Tab
            key={question.id}
            heading={`Pytanie ${index + 1}`}
            textStyle={reviewMode ? textStyle : []}
            activeTextStyle={reviewMode ? textStyle : []}
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
          finishTest={() => setReviewMode(true)}
        />
      </Tab>
    </Tabs>
  );
};

export default Test;
