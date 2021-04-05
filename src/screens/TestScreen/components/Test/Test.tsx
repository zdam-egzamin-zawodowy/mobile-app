import React, { useRef } from 'react';
import { Question } from 'libs/graphql';
import { ScrollableTab, Tab, Tabs, Text } from 'native-base';

export interface TestProps {
  questions: Question[];
}

const Test = ({ questions }: TestProps) => {
  const startedAt = useRef(new Date()).current;

  return (
    <Tabs
      renderTabBar={(props: any) => {
        props.tabStyle = Object.create(props.tabStyle);
        return <ScrollableTab {...props} />;
      }}
    >
      {questions.map((question, index) => {
        return (
          <Tab key={question.id} heading={`Pytanie ${index + 1}`}>
            <Text>Pytanie</Text>
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default Test;
