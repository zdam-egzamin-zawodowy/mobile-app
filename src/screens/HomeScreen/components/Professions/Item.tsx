import React from 'react';
import { Profession, Qualification } from 'libs/graphql';

import { Icon, Left, ListItem, Right, Text, View } from 'native-base';

export interface ItemProps {
  profession: Profession;
  onPress?: (qualification: Qualification) => void;
}

const Item = ({ profession, onPress }: ItemProps) => {
  return (
    <View>
      <ListItem itemHeader itemDivider>
        <Text>{profession.name}</Text>
      </ListItem>
      {profession.qualifications.map(qualification => (
        <ListItem
          key={qualification.id}
          onPress={() => {
            if (onPress) {
              onPress(qualification);
            }
          }}
        >
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

export default React.memo(Item);
