import React from 'react';
import { StyleSheet } from 'react-native';
import { Content as ContentNB } from 'native-base';

export interface ContentProps {
  children?: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <ContentNB padder contentContainerStyle={styles.contentContainer}>
      {children}
    </ContentNB>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});

export default Content;
