import color from 'color';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { OS, Variables } from './types';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const isIphoneX =
  platform === OS.IOS &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);

export default {
  platform,

  // Accordion
  accordionBorderColor: '#d3d3d3',
  accordionContentPadding: 10,
  accordionIconFontSize: 18,
  contentStyle: '#f5f4f5',
  expandedIconStyle: '#000',
  headerStyle: '#edebed',
  iconStyle: '#000',
  disableRow: '#a9a9a9',

  // ActionSheet
  elevation: 4,
  containerTouchableBackgroundColor: 'rgba(0,0,0,0.4)',
  innerTouchableBackgroundColor: '#fff',
  listItemHeight: 50,
  listItemBorderColor: 'transparent',
  marginHorizontal: -15,
  marginLeft: 14,
  marginTop: 15,
  minHeight: 56,
  padding: 15,
  touchableTextColor: '#757575',

  // Android
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  buttonUppercaseAndroidText: true,

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  badgePadding: platform === OS.IOS ? 3 : 0,

  // Button
  buttonFontFamily: platform === OS.IOS ? 'System' : 'Roboto_medium',
  buttonDisabledBg: '#b5b5b5',
  buttonPadding: 6,
  buttonDefaultActiveOpacity: 0.5,
  buttonDefaultFlex: 1,
  buttonDefaultBorderRadius: 2,
  buttonDefaultBorderWidth: 1,
  get buttonPrimaryBg() {
    return this.brandPrimary;
  },
  get buttonPrimaryColor() {
    return this.inverseTextColor;
  },
  get buttonInfoBg() {
    return this.brandInfo;
  },
  get buttonInfoColor() {
    return this.inverseTextColor;
  },
  get buttonSuccessBg() {
    return this.brandSuccess;
  },
  get buttonSuccessColor() {
    return this.inverseTextColor;
  },
  get buttonDangerBg() {
    return this.brandDanger;
  },
  get buttonDangerColor() {
    return this.inverseTextColor;
  },
  get buttonWarningBg() {
    return this.brandWarning;
  },
  get buttonWarningColor() {
    return this.inverseTextColor;
  },
  get buttonTextSize() {
    return platform === OS.IOS
      ? this.fontSizeBase * 1.1
      : this.fontSizeBase - 1;
  },
  get buttonTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get buttonTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: '#fff',
  cardBorderColor: '#ccc',
  cardBorderRadius: 2,
  cardItemPadding: platform === OS.IOS ? 10 : 12,

  // CheckBox
  CheckboxRadius: platform === OS.IOS ? 13 : 0,
  CheckboxBorderWidth: platform === OS.IOS ? 1 : 2,
  CheckboxPaddingLeft: platform === OS.IOS ? 4 : 2,
  CheckboxPaddingBottom: platform === OS.IOS ? 0 : 5,
  CheckboxIconSize: platform === OS.IOS ? 19 : 16,
  CheckboxIconMarginTop: platform === OS.IOS ? undefined : 1,
  CheckboxFontSize: platform === OS.IOS ? 12 / 0.9 : 17,
  checkboxBgColor: '#039BE5',
  checkboxSize: 20,
  checkboxTickColor: '#fff',
  checkboxDefaultColor: 'transparent',
  checkboxTextShadowRadius: 0,

  // Color
  brandPrimary: '#448AFF',
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandDark: '#000',
  brandLight: '#a9a9a9',

  // Container
  containerBgColor: '#fff',

  // Date Picker
  datePickerFlex: 1,
  datePickerPadding: 10,
  datePickerTextColor: '#000',
  datePickerBg: 'transparent',

  // FAB
  fabBackgroundColor: 'blue',
  fabBorderRadius: 28,
  fabBottom: 0,
  fabButtonBorderRadius: 20,
  fabButtonHeight: 40,
  fabButtonLeft: 7,
  fabButtonMarginBottom: 10,
  fabContainerBottom: 20,
  fabDefaultPosition: 20,
  fabElevation: 4,
  fabIconColor: '#fff',
  fabIconSize: 24,
  fabShadowColor: '#000',
  fabShadowOffsetHeight: 2,
  fabShadowOffsetWidth: 0,
  fabShadowOpacity: 0.4,
  fabShadowRadius: 2,
  fabWidth: 56,

  // Font
  DefaultFontSize: 16,
  fontFamily: platform === OS.IOS ? 'System' : 'Roboto',
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: 55,
  get footerDefaultBg() {
    return platform === OS.IOS ? '#F8F8F8' : this.brandPrimary;
  },
  footerPaddingBottom: 0,

  // FooterTab
  tabBarTextColor: platform === OS.IOS ? '#6b6b6b' : '#b3c7f9',
  tabBarTextSize: platform === OS.IOS ? 14 : 11,
  activeTab: platform === OS.IOS ? '#007aff' : '#fff',
  sTabBarActiveTextColor: '#007aff',
  tabBarActiveTextColor: platform === OS.IOS ? '#007aff' : '#fff',
  tabActiveBgColor: platform === OS.IOS ? '#cde1f9' : '#3F51B5',

  // Header
  toolbarBtnColor: platform === OS.IOS ? '#007aff' : '#fff',
  get toolbarDefaultBg() {
    return platform === OS.IOS ? '#F8F8F8' : this.brandPrimary;
  },
  toolbarHeight: platform === OS.IOS ? 64 : 56,
  toolbarSearchIconSize: platform === OS.IOS ? 20 : 23,
  toolbarInputColor: platform === OS.IOS ? '#CECDD2' : '#fff',
  searchBarHeight: platform === OS.IOS ? 30 : 40,
  searchBarInputHeight: platform === OS.IOS ? 30 : 50,
  toolbarBtnTextColor: platform === OS.IOS ? '#007aff' : '#fff',
  toolbarDefaultBorder: platform === OS.IOS ? '#a7a6ab' : '#3F51B5',
  iosStatusbar: platform === OS.IOS ? 'dark-content' : 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hex();
  },
  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hex();
  },

  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: platform === OS.IOS ? 30 : 28,
  iconHeaderSize: platform === OS.IOS ? 33 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',
  inputHeightBase: 50,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#575757';
  },

  // Line Height
  buttonLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 25,
  lineHeight: platform === OS.IOS ? 20 : 24,
  listItemSelected: platform === OS.IOS ? '#007aff' : '#3F51B5',

  // List
  listBg: 'transparent',
  listBorderColor: '#c9c9c9',
  listDividerBg: '#f4f4f4',
  listBtnUnderlayColor: '#DDD',
  listItemPadding: platform === OS.IOS ? 10 : 12,
  listNoteColor: '#808080',
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',

  // Radio Button
  radioBtnSize: platform === OS.IOS ? 25 : 23,
  radioSelectedColorAndroid: '#3F51B5',
  radioBtnLineHeight: platform === OS.IOS ? 29 : 24,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  get segmentBackgroundColor() {
    return platform === OS.IOS ? '#F8F8F8' : this.brandPrimary;
  },
  segmentActiveBackgroundColor: platform === OS.IOS ? '#007aff' : '#fff',
  segmentTextColor: platform === OS.IOS ? '#007aff' : '#fff',
  segmentActiveTextColor: platform === OS.IOS ? '#fff' : '#3F51B5',
  segmentBorderColor: platform === OS.IOS ? '#007aff' : '#fff',
  segmentBorderColorMain: platform === OS.IOS ? '#a7a6ab' : '#3F51B5',

  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Tab
  tabBarDisabledTextColor: '#BDBDBD',
  tabDefaultBg: platform === OS.IOS ? '#F8F8F8' : '#3F51B5',
  topTabBarTextColor: platform === OS.IOS ? '#6b6b6b' : '#b3c7f9',
  topTabBarActiveTextColor: platform === OS.IOS ? '#007aff' : '#fff',
  topTabBarBorderColor: platform === OS.IOS ? '#a7a6ab' : '#fff',
  topTabBarActiveBorderColor: platform === OS.IOS ? '#007aff' : '#fff',

  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,

  // Text
  textColor: '#000',
  inverseTextColor: '#fff',
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontFamily: platform === OS.IOS ? 'System' : 'Roboto_medium',
  titleFontSize: platform === OS.IOS ? 17 : 19,
  subTitleFontSize: platform === OS.IOS ? 11 : 14,
  subtitleColor: platform === OS.IOS ? '#8e8e93' : '#FFF',
  titleFontColor: platform === OS.IOS ? '#000' : '#FFF',

  // Other
  borderRadiusBase: platform === OS.IOS ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,

  // iPhoneX SafeArea
  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34,
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21,
    },
  },
} as Variables;
