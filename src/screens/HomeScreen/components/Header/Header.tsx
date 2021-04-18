import React, { useState, useRef, useEffect } from 'react';
import { useDebounce } from 'react-use';

import { Keyboard, StyleSheet, TextInput } from 'react-native';
import { Icon, Input, Item, Header as NBHeader, View } from 'native-base';
import Menu from 'common/Menu/Menu';

export interface HeaderProps {
  onSearch?: (search: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const inputRef = useRef<Input>(null);
  const [search, setSearch] = useState('');
  useDebounce(
    () => {
      if (onSearch) {
        onSearch(search.toLowerCase());
      }
    },
    500,
    [search],
  );
  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidHide', () => {
      const input = (inputRef.current as any)?._root as TextInput;
      if (input?.isFocused()) {
        input?.blur();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NBHeader searchBar rounded hasSegment style={styles.header}>
      <Item>
        <Icon name="ios-search" />
        <Input
          placeholder="Wyszukaj kwalifikację"
          onChangeText={setSearch}
          value={search}
          ref={inputRef}
          allowFontScaling={false}
        />
      </Item>
      <View>
        <Menu style={styles.menu} />
      </View>
    </NBHeader>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  menu: {
    marginLeft: 10,
  },
});

export default Header;
