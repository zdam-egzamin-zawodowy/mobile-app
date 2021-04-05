import React from 'react';
import { FlatListProps, RefreshControl } from 'react-native';
import { Profession } from 'libs/graphql';

import { List } from 'native-base';
import Item from './Item';

export interface ProfessionsProps
  extends Pick<FlatListProps<Profession>, 'refreshing' | 'onRefresh'> {
  professions: Profession[];
}

const Professions = ({
  professions,
  refreshing,
  onRefresh,
}: ProfessionsProps) => {
  return (
    <List
      dataArray={professions}
      renderItem={({ item }: { item: Profession }) => {
        return <Item profession={item} />;
      }}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh ?? (() => {})}
        />
      }
    />
  );
};

export default Professions;
