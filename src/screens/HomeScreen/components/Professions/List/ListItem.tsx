import React, { Fragment, useMemo, memo } from 'react';
import { Icon, Left, ListItem, NativeBase, Right, Text } from 'native-base';

export type ListItemProps = {
  onPress?: (id: string) => void;
  id?: string;
  text: string;
} & Pick<NativeBase.ListItem, 'itemDivider' | 'itemHeader'>;

const MyListItem = ({
  onPress,
  text,
  itemDivider,
  itemHeader,
  id,
}: ListItemProps) => {
  const handlePress = useMemo(() => {
    if (onPress && id) {
      return () => {
        onPress(id);
      };
    }
    return undefined;
  }, [onPress, id]);

  return (
    <ListItem
      itemHeader={itemHeader}
      itemDivider={itemDivider}
      onPress={handlePress}
    >
      {onPress ? (
        <Fragment>
          <Left>
            <Text>{text}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </Fragment>
      ) : (
        <Text>{text}</Text>
      )}
    </ListItem>
  );
};

export default memo(MyListItem);
