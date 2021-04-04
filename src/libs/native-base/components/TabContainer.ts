import { Platform } from 'react-native';

import variable from '../variables/platform';
import { OS } from '../variables/types';

export default (variables /* : * */ = variable) => {
  const tabContainerTheme = {
    elevation: 3,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: Platform.OS === OS.IOS ? variables.borderWidth : 0,
    borderColor: variables.topTabBarBorderColor,
  };

  return tabContainerTheme;
};
