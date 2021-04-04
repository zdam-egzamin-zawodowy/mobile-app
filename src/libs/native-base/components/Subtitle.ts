import { Platform } from 'react-native';

import variable from '../variables/platform';
import { OS } from '../variables/types';

export default (variables /* : * */ = variable) => {
  const subtitleTheme = {
    fontSize: variables.subTitleFontSize,
    fontFamily: variables.titleFontFamily,
    color: variables.subtitleColor,
    textAlign: Platform.OS === OS.IOS ? 'center' : 'left',
    paddingLeft: Platform.OS === OS.IOS ? 4 : 0,
    marginLeft: Platform.OS === OS.IOS ? undefined : -3,
  };

  return subtitleTheme;
};
