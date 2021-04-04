import React, { useState } from 'react';
import { useDebounce } from 'react-use';

import { Icon, Input, Item, Header as NBHeader } from 'native-base';

export interface HeaderProps {
  onSearch?: (search: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
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
  return (
    <NBHeader searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Wyszukaj kwalifikację" onChangeText={setSearch} />
      </Item>
    </NBHeader>
  );
};

export default Header;
