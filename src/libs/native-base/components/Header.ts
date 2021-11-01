import { PixelRatio, StatusBar } from 'react-native';

import variable from '../variables/platform';
import { OS } from '../variables/types';

export default (variables /* : * */ = variable) => {
  const platform = variables.platform;

  const headerTheme = {
    '.span': {
      height: 128,
      'NativeBase.Left': {
        alignSelf: 'flex-start',
      },
      'NativeBase.Body': {
        alignSelf: 'flex-end',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: 26,
      },
      'NativeBase.Right': {
        alignSelf: 'flex-start',
      },
    },
    '.hasSubtitle': {
      'NativeBase.Body': {
        'NativeBase.Title': {
          fontSize: variables.titleFontSize - 2,
          fontFamily: variables.titleFontFamily,
          textAlign: 'center',
          fontWeight: '500',
          paddingBottom: 3,
        },
        'NativeBase.Subtitle': {
          fontSize: variables.subTitleFontSize,
          fontFamily: variables.titleFontFamily,
          color: variables.subtitleColor,
          textAlign: 'center',
        },
      },
    },
    '.transparent': {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      paddingTop: platform === OS.ANDROID ? StatusBar.currentHeight : undefined,
      height:
        platform === OS.ANDROID
          ? variables.toolbarHeight + (StatusBar.currentHeight ?? 0)
          : variables.toolbarHeight,
    },
    '.noShadow': {
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
    },
    '.hasTabs': {
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      borderBottomWidth: null,
    },
    '.hasSegment': {
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      borderBottomWidth: null,
      'NativeBase.Left': {
        flex: 0.3,
      },
      'NativeBase.Right': {
        flex: 0.3,
      },
      'NativeBase.Body': {
        flex: 1,
        'NativeBase.Segment': {
          marginRight: 0,
          alignSelf: 'center',
          'NativeBase.Button': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    '.noLeft': {
      'NativeBase.Left': {
        width: platform === OS.IOS ? undefined : 0,
        flex: platform === OS.IOS ? 1 : 0,
      },
      'NativeBase.Body': {
        'NativeBase.Title': {
          paddingLeft: platform === OS.IOS ? undefined : 10,
        },
        'NativeBase.Subtitle': {
          paddingLeft: platform === OS.IOS ? undefined : 10,
        },
      },
    },
    'NativeBase.Button': {
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      '.transparent': {
        'NativeBase.Text': {
          color: variables.toolbarBtnTextColor,
          fontWeight: '600',
        },
        'NativeBase.Icon': {
          color: variables.toolbarBtnColor,
        },
        'NativeBase.IconNB': {
          color: variables.toolbarBtnColor,
        },
        paddingHorizontal: variables.buttonPadding,
      },
      paddingHorizontal: 15,
    },
    '.searchBar': {
      'NativeBase.Item': {
        'NativeBase.Icon': {
          backgroundColor: 'transparent',
          color: variables.dropdownLinkColor,
          fontSize: variables.toolbarSearchIconSize,
          alignItems: 'center',
          marginTop: 2,
          paddingRight: 10,
          paddingLeft: 10,
        },
        'NativeBase.IconNB': {
          backgroundColor: 'transparent',
          color: null,
          alignSelf: 'center',
        },
        'NativeBase.Input': {
          alignSelf: 'center',
          lineHeight: null,
          height: variables.searchBarInputHeight,
        },
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        height: variables.searchBarHeight,
        borderColor: 'transparent',
        backgroundColor: variables.toolbarInputColor,
      },
      'NativeBase.Button': {
        '.transparent': {
          'NativeBase.Text': {
            fontWeight: '500',
          },
          paddingHorizontal: null,
          paddingLeft: platform === OS.IOS ? 10 : null,
        },
        paddingHorizontal: platform === OS.IOS ? undefined : null,
        width: platform === OS.IOS ? undefined : 0,
        height: platform === OS.IOS ? undefined : 0,
      },
    },
    '.rounded': {
      'NativeBase.Item': {
        borderRadius: platform === OS.IOS ? 25 : 3,
      },
    },
    'NativeBase.Left': {
      'NativeBase.Button': {
        '.hasText': {
          marginLeft: -10,
          height: 30,
          'NativeBase.Icon': {
            color: variables.toolbarBtnColor,
            fontSize: variables.iconHeaderSize,
            marginTop: 2,
            marginRight: 5,
            marginLeft: 2,
          },
          'NativeBase.Text': {
            color: variables.toolbarBtnTextColor,
            fontSize: platform === OS.IOS ? 17 : 0,
            marginLeft: 7,
            lineHeight: 19.5,
          },
          'NativeBase.IconNB': {
            color: variables.toolbarBtnColor,
            fontSize: variables.iconHeaderSize,
            marginTop: 2,
            marginRight: 5,
            marginLeft: 2,
          },
        },
        '.transparent': {
          marginLeft: platform === OS.IOS ? -3 : 0,
          'NativeBase.Icon': {
            color: variables.toolbarBtnColor,
            fontSize:
              platform === OS.IOS
                ? variables.iconHeaderSize + 1
                : variables.iconHeaderSize,
            marginTop: 0,
            marginRight: 2,
            marginLeft: 1,
            paddingTop: 1,
          },
          'NativeBase.IconNB': {
            color: variables.toolbarBtnColor,
            fontSize:
              platform === OS.IOS
                ? variables.iconHeaderSize + 1
                : variables.iconHeaderSize - 2,
            marginTop: 0,
            marginRight: 2,
            marginLeft: 1,
            paddingTop: 1,
          },
          'NativeBase.Text': {
            color: variables.toolbarBtnTextColor,
            fontSize: platform === OS.IOS ? 17 : 14,
            top: platform === OS.IOS ? 1 : -1.5,
            paddingLeft: platform === OS.IOS ? 2 : 5,
            paddingRight: platform === OS.IOS ? undefined : 10,
          },
          backgroundColor: 'transparent',
          borderColor: null,
          elevation: 0,
          shadowColor: null,
          shadowOffset: null,
          shadowRadius: null,
          shadowOpacity: null,
        },
        'NativeBase.Icon': {
          color: variables.toolbarBtnColor,
        },
        'NativeBase.IconNB': {
          color: variables.toolbarBtnColor,
        },
        alignSelf: null,
        paddingRight: variables.buttonPadding,
        paddingLeft: platform === OS.IOS ? 4 : 8,
      },
      flex: platform === OS.IOS ? 1 : 0.4,
      alignSelf: 'center',
      alignItems: 'flex-start',
    },
    'NativeBase.Body': {
      flex: 1,
      alignItems: platform === OS.IOS ? 'center' : 'flex-start',
      alignSelf: 'center',
      'NativeBase.Segment': {
        borderWidth: 0,
        alignSelf: 'flex-end',
        marginRight: platform === OS.IOS ? -40 : -55,
      },
      'NativeBase.Button': {
        alignSelf: 'center',
        '.transparent': {
          backgroundColor: 'transparent',
        },
        'NativeBase.Icon': {
          color: variables.toolbarBtnColor,
        },
        'NativeBase.IconNB': {
          color: variables.toolbarBtnColor,
        },
        'NativeBase.Text': {
          color: variables.inverseTextColor,
          backgroundColor: 'transparent',
        },
      },
    },
    'NativeBase.Right': {
      'NativeBase.Button': {
        '.hasText': {
          height: 30,
          'NativeBase.Icon': {
            color: variables.toolbarBtnColor,
            fontSize: variables.iconHeaderSize - 2,
            marginTop: 2,
            marginRight: 2,
            marginLeft: 5,
          },
          'NativeBase.Text': {
            color: variables.toolbarBtnTextColor,
            fontSize: platform === OS.IOS ? 17 : 14,
            lineHeight: 19.5,
          },
          'NativeBase.IconNB': {
            color: variables.toolbarBtnColor,
            fontSize: variables.iconHeaderSize - 2,
            marginTop: 2,
            marginRight: 2,
            marginLeft: 5,
          },
        },
        '.transparent': {
          marginRight: platform === OS.IOS ? -9 : -5,
          paddingLeft: 15,
          paddingRight: 12,
          paddingHorizontal: 15,
          borderRadius: 50,
          'NativeBase.Icon': {
            color: variables.toolbarBtnColor,
            fontSize: variables.iconHeaderSize - 2,
            marginTop: 0,
            marginLeft: 2,
            marginRight: 0,
            // paddingTop: 0
          },
          'NativeBase.IconNB': {
            color: variables.toolbarBtnColor,
            fontSize: variables.iconHeaderSize - 2,
            marginTop: 0,
            marginLeft: 2,
            marginRight: 0,
            // paddingTop: 0
          },
          'NativeBase.Text': {
            color: variables.toolbarBtnTextColor,
            fontSize: platform === OS.IOS ? 17 : 14,
            top: platform === OS.IOS ? 1 : -1.5,
            paddingRight: platform === OS.IOS ? 0 : undefined,
          },
          backgroundColor: 'transparent',
          borderColor: null,
          elevation: 0,
          shadowColor: null,
          shadowOffset: null,
          shadowRadius: null,
          shadowOpacity: null,
        },
        'NativeBase.Icon': {
          color: variables.toolbarBtnColor,
        },
        'NativeBase.IconNB': {
          color: variables.toolbarBtnColor,
        },
        alignSelf: null,
        paddingHorizontal: variables.buttonPadding,
      },
      flex: 1,
      alignSelf: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    backgroundColor: variables.toolbarDefaultBg,
    flexDirection: 'row',
    // paddingHorizontal: 10,
    paddingLeft: platform === OS.IOS ? 6 : 10,
    paddingRight: 10,
    justifyContent: 'center',
    // paddingTop: platform === PLATFORM.IOS ? 18 : 0,
    borderBottomWidth:
      platform === OS.IOS ? 1 / PixelRatio.getPixelSizeForLayoutSize(1) : 0,
    borderBottomColor: variables.toolbarDefaultBorder,
    height: variables.toolbarHeight,
    elevation: 3,
    top: 0,
    left: 0,
    right: 0,
  };

  return headerTheme;
};
