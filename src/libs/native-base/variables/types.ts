import { Platform } from 'react-native';

export type Portrait = {
  topInset: number;
  leftInset: number;
  rightInset: number;
  bottomInset: number;
};

export type Landscape = {
  topInset: number;
  leftInset: number;
  rightInset: number;
  bottomInset: number;
};

export type Inset = {
  portrait: Portrait;
  landscape: Landscape;
};

export type Variables = {
  platform: typeof Platform.OS;
  accordionBorderColor: string;
  accordionContentPadding: number;
  accordionIconFontSize: number;
  contentStyle: string;
  expandedIconStyle: string;
  headerStyle: string;
  iconStyle: string;
  disableRow: string;
  elevation: number;
  containerTouchableBackgroundColor: string;
  innerTouchableBackgroundColor: string;
  listItemHeight: number;
  listItemBorderColor: string;
  marginHorizontal: number;
  marginLeft: number;
  marginTop: number;
  minHeight: number;
  padding: number;
  touchableTextColor: string;
  androidRipple: boolean;
  androidRippleColor: string;
  androidRippleColorDark: string;
  buttonUppercaseAndroidText: boolean;
  badgeBg: string;
  badgeColor: string;
  badgePadding: number;
  buttonFontFamily: string;
  buttonDisabledBg: string;
  buttonPadding: number;
  buttonDefaultActiveOpacity: number;
  buttonDefaultFlex: number;
  buttonDefaultBorderRadius: number;
  buttonDefaultBorderWidth: number;
  buttonHeightNormal: number;
  buttonPrimaryBg: string;
  buttonPrimaryColor: string;
  buttonInfoBg: string;
  buttonInfoColor: string;
  buttonSuccessBg: string;
  buttonSuccessColor: string;
  buttonDangerBg: string;
  buttonDangerColor: string;
  buttonWarningBg: string;
  buttonWarningColor: string;
  buttonTextSize: number;
  buttonTextSizeLarge: number;
  buttonTextSizeSmall: number;
  borderRadiusLarge: number;
  iconSizeLarge: number;
  iconSizeSmall: number;
  cardDefaultBg: string;
  cardBorderColor: string;
  cardBorderRadius: number;
  cardItemPadding: number;
  CheckboxRadius: number;
  CheckboxBorderWidth: number;
  CheckboxPaddingLeft: number;
  CheckboxPaddingBottom: number;
  CheckboxIconSize: number;
  CheckboxIconMarginTop: number;
  CheckboxFontSize: number;
  checkboxBgColor: string;
  checkboxSize: number;
  checkboxTickColor: string;
  checkboxDefaultColor: string;
  checkboxTextShadowRadius: number;
  brandPrimary: string;
  brandInfo: string;
  brandSuccess: string;
  brandDanger: string;
  brandWarning: string;
  brandDark: string;
  brandLight: string;
  containerBgColor: string;
  datePickerFlex: number;
  datePickerPadding: number;
  datePickerTextColor: string;
  datePickerBg: string;
  fabBackgroundColor: string;
  fabBorderRadius: number;
  fabBottom: number;
  fabButtonBorderRadius: number;
  fabButtonHeight: number;
  fabButtonLeft: number;
  fabButtonMarginBottom: number;
  fabContainerBottom: number;
  fabDefaultPosition: number;
  fabElevation: number;
  fabIconColor: string;
  fabIconSize: number;
  fabShadowColor: string;
  fabShadowOffsetHeight: number;
  fabShadowOffsetWidth: number;
  fabShadowOpacity: number;
  fabShadowRadius: number;
  fabWidth: number;
  DefaultFontSize: number;
  fontFamily: string;
  fontSizeBase: number;
  fontSizeH1: number;
  fontSizeH2: number;
  fontSizeH3: number;
  footerHeight: number;
  footerDefaultBg: string;
  footerPaddingBottom: number;
  tabBarTextColor: string;
  tabBarTextSize: number;
  activeTab: string;
  sTabBarActiveTextColor: string;
  tabBarActiveTextColor: string;
  tabActiveBgColor: string;
  toolbarBtnColor: string;
  toolbarDefaultBg: string;
  toolbarHeight: number;
  toolbarSearchIconSize: number;
  toolbarInputColor: string;
  searchBarHeight: number;
  searchBarInputHeight: number;
  toolbarBtnTextColor: string;
  toolbarDefaultBorder: string;
  iosStatusbar: string;
  statusBarColor: string;
  darkenHeader: string;
  iconFamily: string;
  iconFontSize: number;
  iconHeaderSize: number;
  inputFontSize: number;
  inputBorderColor: string;
  inputSuccessBorderColor: string;
  inputErrorBorderColor: string;
  inputHeightBase: number;
  inputColor: string;
  inputColorPlaceholder: string;
  buttonLineHeight: number;
  lineHeightH1: number;
  lineHeightH2: number;
  lineHeightH3: number;
  lineHeight: number;
  listItemSelected: string;
  listBg: string;
  listBorderColor: string;
  listDividerBg: string;
  listBtnUnderlayColor: string;
  listItemPadding: number;
  listNoteColor: string;
  listNoteSize: number;
  defaultProgressColor: string;
  inverseProgressColor: string;
  radioBtnSize: number;
  radioSelectedColorAndroid: string;
  radioBtnLineHeight: number;
  radioColor: string;
  segmentBackgroundColor: string;
  segmentActiveBackgroundColor: string;
  segmentTextColor: string;
  segmentActiveTextColor: string;
  segmentBorderColor: string;
  segmentBorderColorMain: string;
  defaultSpinnerColor: string;
  inverseSpinnerColor: string;
  tabBarDisabledTextColor: string;
  tabDefaultBg: string;
  topTabBarTextColor: string;
  topTabBarActiveTextColor: string;
  topTabBarBorderColor: string;
  topTabBarActiveBorderColor: string;
  tabBgColor: string;
  tabFontSize: number;
  textColor: string;
  inverseTextColor: string;
  noteFontSize: number;
  defaultTextColor: string;
  titleFontFamily: string;
  titleFontSize: number;
  subTitleFontSize: number;
  subtitleColor: string;
  titleFontColor: string;
  borderRadiusBase: number;
  borderWidth: number;
  contentPadding: number;
  dropdownLinkColor: string;
  inputLineHeight: number;
  deviceWidth: number;
  deviceHeight: number;
  isIphoneX: boolean;
  inputGroupRoundedBorderRadius: number;
  Inset: Inset;
};

export enum OS {
  ANDROID = 'android',
  IOS = 'ios',
}
