import React from 'react';
import { Profession } from 'libs/graphql';

import { Icon, Left, ListItem, Right, Text, View } from 'native-base';

export interface ItemProps {
  profession: Profession;
}

const Item = ({ profession }: ItemProps) => {
  return (
    <View>
      <ListItem itemHeader itemDivider>
        <Text>{profession.name}</Text>
      </ListItem>
      {profession.qualifications.map(qualification => (
        <ListItem key={qualification.id}>
          <Left>
            <Text>
              {qualification.name} ({qualification.code})
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      ))}
    </View>
  );
};

export default Item;
