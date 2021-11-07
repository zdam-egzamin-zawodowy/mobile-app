import React from 'react';
import Config from 'react-native-config';
import buildURL from 'utils/buildURL';

import { Linking, StyleSheet } from 'react-native';
import { ActionSheet, Icon, NativeBase } from 'native-base';

const OPTIONS = ['Strona internetowa', 'Kontakt', 'Anuluj'];
enum OptionIndex {
  WEBSITE,
  CONTACT,
  CANCEL,
}

export type MenuProps = Omit<NativeBase.Icon, 'onPress' | 'type' | 'name'>;

const Menu = ({ style, ...rest }: MenuProps) => {
  const showMenu = () => {
    ActionSheet.show(
      {
        options: OPTIONS,
        cancelButtonIndex: OptionIndex.CANCEL,
      },
      index => {
        switch (index) {
          case OptionIndex.WEBSITE:
            Linking.openURL(Config.WEBSITE);
            break;
          case OptionIndex.CONTACT:
            Linking.openURL(buildURL('email', Config.CONTACT_EMAIL));
            break;
        }
      },
    );
  };

  return (
    <Icon
      type="Feather"
      name="more-vertical"
      fontSize={30}
      style={[styles.icon, style]}
      onPress={showMenu}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
});

export default Menu;
