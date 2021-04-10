import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Icon,
  Left,
  Button,
  Title,
  Body,
  Header as NBHeader,
  Right,
} from 'native-base';
import Menu from 'common/Menu/Menu';

export interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <NBHeader hasTabs>
      <Left>
        <Button transparent onPress={navigation.goBack}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Menu />
      </Right>
    </NBHeader>
  );
};

export default Header;
