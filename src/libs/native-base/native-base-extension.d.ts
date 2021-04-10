/// <reference path="../../../node_modules/native-base/index.d.ts" />

import { FlatListProps } from 'react-native';

declare module 'native-base' {
  namespace NativeBase {
    interface List {
      ListEmptyComponent?: FlatListProps<any>['ListEmptyComponent'];
    }
  }
}
