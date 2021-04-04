import React from 'react';
import { List } from 'native-base';
import { Profession } from 'libs/graphql';
import Item from './Item';

export interface ProfessionsProps {
  professions: Profession[];
}

const Professions = ({ professions }: ProfessionsProps) => {
  return (
    <List
      dataArray={professions}
      renderItem={({ item }: { item: Profession }) => {
        return <Item profession={item} />;
      }}
      keyExtractor={item => item.id}
    />
  );
};

export default Professions;
