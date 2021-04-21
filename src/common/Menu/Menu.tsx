import React from 'react';
import { EMAIL, WEBSITE } from 'config/app';
import buildURL from 'utils/buildURL';

import { Linking, StyleSheet } from 'react-native';
import { ActionSheet, Icon, NativeBase } from 'native-base';

export interface MenuProps
  extends Omit<NativeBase.Icon, 'onPress' | 'type' | 'name'> {}

const OPTIONS = ['Strona internetowa', 'Kontakt', 'Anuluj'];
const WEBSITE_OPT_INDEX = 0;
const CONTACT_OPT_INDEX = 1;
const CANCEL_OPT_INDEX = OPTIONS.length - 1;

const Menu = ({ style, ...rest }: MenuProps) => {
  const showMenu = () => {
    ActionSheet.show(
      {
        options: OPTIONS,
        cancelButtonIndex: CANCEL_OPT_INDEX,
      },
      index => {
        switch (index) {
          case WEBSITE_OPT_INDEX:
            Linking.openURL(WEBSITE);
            break;
          case CONTACT_OPT_INDEX:
            Linking.openURL(buildURL('email', EMAIL));
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
