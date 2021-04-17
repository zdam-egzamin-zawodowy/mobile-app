import { WEBSITE } from './app';

export const CDN_URI = __DEV__
  ? 'http://localhost:9000/'
  : 'https://cdn.zdamegzaminzawodowy.pl/';

export const IMAGE_RESIZING_SERVICE = `${WEBSITE}/_next/image`;
