import { useRef } from 'react';
import { FlatList } from 'react-native';
import { Item } from './List/List';
import { useUpdateEffect } from 'react-use';
import { Mode } from '../ModeSelector/ModeSelector';

const useScrollTopOnSearchOrModeChange = (search: string, mode: Mode) => {
  const listRef = useRef<FlatList<Item>>(null);

  useUpdateEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [search, mode]);

  return listRef;
};

export default useScrollTopOnSearchOrModeChange;
