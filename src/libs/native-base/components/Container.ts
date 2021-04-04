import { Platform, Dimensions } from 'react-native';

import variable from '../variables/platform';
import { OS } from '../variables/types';

const deviceHeight = Dimensions.get('window').height;
export default (variables /* : * */ = variable) => {
  const theme = {
    flex: 1,
    height: Platform.OS === OS.IOS ? deviceHeight : deviceHeight - 20,
    backgroundColor: variables.containerBgColor,
  };

  return theme;
};
