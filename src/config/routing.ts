export enum Screen {
  Home = 'HomeScreen',
  Test = 'TestScreen',
}

export type TestScreenParams = {
  qualificationID: number;
  limit: number;
};

export type AppStackParamList = {
  [Screen.Home]: undefined;
  [Screen.Test]: TestScreenParams;
};
