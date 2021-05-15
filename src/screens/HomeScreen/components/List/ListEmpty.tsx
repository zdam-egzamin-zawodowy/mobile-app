import React from 'react';
import { StyleSheet } from 'react-native';
import { H1, Content } from 'native-base';

const ListEmpty = () => {
  return (
    <Content padder contentContainerStyle={styles.wrapper}>
      <H1 style={styles.heading}>Nie znaleziono żadnej kwalifikacji</H1>
    </Content>
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
