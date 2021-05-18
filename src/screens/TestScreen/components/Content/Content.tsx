import React from 'react';
import { StyleSheet } from 'react-native';
import { Content as ContentNB, NativeBase } from 'native-base';

export interface ContentProps {
  children?: React.ReactNode;
  contentContainerStyle?: NativeBase.Content['contentContainerStyle'];
}

const Content = ({ children, contentContainerStyle }: ContentProps) => {
  return (
    <ContentNB
      padder
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
    >
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
