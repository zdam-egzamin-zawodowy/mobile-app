import variable from '../variables/platform';
import { OS } from '../variables/types';

export default (variables /* : * */ = variable) => {
  const platform = variables.platform;

  const tabHeadingTheme = {
    flexDirection: 'row',
    backgroundColor: variables.tabDefaultBg,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '.scrollable': {
      paddingHorizontal: 20,
      flex: platform === OS.Android ? 0 : 1,
      minWidth: platform === OS.Android ? undefined : 60,
    },
    'NativeBase.Text': {
      color: variables.topTabBarTextColor,
      marginHorizontal: 7,
    },
    'NativeBase.Icon': {
      color: variables.topTabBarTextColor,
      fontSize: platform === OS.IOS ? 26 : undefined,
    },
    '.active': {
      'NativeBase.Text': {
        color: variables.topTabBarActiveTextColor,
        fontWeight: '600',
      },
      'NativeBase.Icon': {
        color: variables.topTabBarActiveTextColor,
      },
    },
  };

  return tabHeadingTheme;
};
