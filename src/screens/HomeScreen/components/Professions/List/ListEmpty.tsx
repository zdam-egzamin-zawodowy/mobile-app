import React from 'react';
import { StyleSheet } from 'react-native';
import { H1, View } from 'native-base';

const ListEmpty = () => {
  return (
    <View padder style={styles.wrapper}>
      <H1 style={styles.heading}>Nie znaleziono żadnej kwalifikacji</H1>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export default ListEmpty;
