/// <reference path="../../../node_modules/native-base/index.d.ts" />

declare module 'native-base' {
  import { FlatListProps } from 'react-native';
  namespace NativeBase {
    interface List {
      ListEmptyComponent?: FlatListProps<any>['ListEmptyComponent'];
    }
  }
}
