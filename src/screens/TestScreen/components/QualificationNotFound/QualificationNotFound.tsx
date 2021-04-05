import React from 'react';

import { StyleSheet } from 'react-native';
import { H1 } from 'native-base';
import Content from '../Content/Content';

const QualificationNotFound = () => {
  return (
    <Content>
      <H1 style={styles.heading}>Kwalifikacja nie została znaleziona</H1>
    </Content>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  heading: {
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});

export default QualificationNotFound;
