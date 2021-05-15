import React, { Fragment, useCallback } from 'react';
import { Icon, Left, ListItem, NativeBase, Right, Text } from 'native-base';

export interface ListItemProps
  extends Pick<NativeBase.ListItem, 'itemDivider' | 'itemHeader'> {
  onPress?: (id: string) => void;
  id?: string;
  text: string;
}

const MyListItem = ({
  onPress,
  text,
  itemDivider,
  itemHeader,
  id,
}: ListItemProps) => {
  const handlePress = useCallback(() => {
    if (onPress && id) {
      onPress(id);
    }
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

export default React.memo(MyListItem);
