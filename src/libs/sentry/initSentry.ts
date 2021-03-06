import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

const initSentry = () => {
  if (!Config.SENTRY_DSN) {
    return;
  }

  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: __DEV__ ? 'development' : 'production',
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: [Config.RAW_API_URL],
        routingInstrumentation,
      }),
    ],
    tracesSampleRate: 0.3,
    release: __DEV__
      ? 'com.dawidwysokinski.zdamegzaminzawodowy@development'
      : undefined,
  });
};

export default initSentry;
