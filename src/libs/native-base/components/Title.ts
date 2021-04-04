import { Platform } from 'react-native';

import variable from '../variables/platform';
import { OS } from '../variables/types';

export default (variables /* : * */ = variable) => {
  const titleTheme = {
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontFamily,
    color: variables.titleFontColor,
    fontWeight: Platform.OS === OS.IOS ? '700' : undefined,
    textAlign: Platform.OS === OS.IOS ? 'center' : 'left',
    paddingLeft: Platform.OS === OS.IOS ? 4 : 0,
    marginLeft: Platform.OS === OS.IOS ? undefined : -3,
    paddingTop: 1,
  };

  return titleTheme;
};
