import React from 'react';

import { StyleSheet } from 'react-native';
import { H1, View } from 'native-base';

const QualificationNotFound = () => {
  return (
    <View style={styles.wrapper}>
      <H1 style={styles.heading}>Kwalifikacja nie została znaleziona</H1>
    </View>
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
