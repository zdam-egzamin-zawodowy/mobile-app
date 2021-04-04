import { Platform } from 'react-native';

import variable from '../variables/platform';
import { OS } from '../variables/types';

export default (variables /* : * */ = variable) => {
  const radioTheme = {
    '.selected': {
      'NativeBase.IconNB': {
        color:
          Platform.OS === OS.IOS
            ? variables.radioColor
            : variables.radioSelectedColorAndroid,
        lineHeight: Platform.OS === OS.IOS ? 25 : variables.radioBtnLineHeight,
        height: Platform.OS === OS.IOS ? 20 : undefined,
      },
    },
    'NativeBase.IconNB': {
      color: Platform.OS === OS.IOS ? 'transparent' : undefined,
      lineHeight:
        Platform.OS === OS.IOS ? undefined : variables.radioBtnLineHeight,
      fontSize: Platform.OS === OS.IOS ? undefined : variables.radioBtnSize,
    },
  };

  return radioTheme;
};
