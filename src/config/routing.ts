export enum Screen {
  HOME = 'HomeScreen',
  TEST = 'TestScreen',
}

export type TestScreenParams = {
  qualificationID: number;
  limit: number;
};

export type AppStackParamList = {
  [Screen.HOME]: undefined;
  [Screen.TEST]: TestScreenParams;
};
