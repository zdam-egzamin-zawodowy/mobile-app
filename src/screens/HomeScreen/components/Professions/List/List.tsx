import React, { forwardRef } from 'react';

import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ListItem, { ListItemProps } from './ListItem';
import ListEmpty from './ListEmpty';
import ListLoading from './ListLoading';

export type Item = ListItemProps;
export type ListProps = {
  items: Item[];
  loading?: boolean;
} & Pick<
  FlatListProps<Item>,
  'refreshing' | 'onRefresh' | 'contentContainerStyle'
>;

const noop = () => {};
const keyExtractor = (item: ListItemProps) => item.id!;
const renderItem = ({ item }: { item: Item }) => <ListItem {...item} />;

const List = forwardRef<FlatList<Item>, ListProps>(
  ({ items, refreshing, onRefresh, loading, ...rest }: ListProps, ref) => {
    return (
      <FlatList
        data={items}
        ref={ref}
        renderItem={renderItem}
        ListEmptyComponent={loading ? null : <ListEmpty />}
        ListFooterComponent={loading ? <ListLoading /> : null}
        ListFooterComponentStyle={styles.footerWrapper}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        onEndReachedThreshold={0.75}
        refreshControl={
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh ?? noop}
          />
        }
        initialNumToRender={10}
        {...rest}
      />
    );
  },
);

const styles = StyleSheet.create({
  footerWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default List;
