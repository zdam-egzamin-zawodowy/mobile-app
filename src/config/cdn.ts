export const CDN_URI = __DEV__
  ? 'http://localhost:9000/'
  : 'https://cdn.zdamegzaminzawodowy.pl/';

export const IMAGE_RESIZING_SERVICE = `${
  __DEV__ ? 'http://localhost:3000' : 'https://zdamegzaminzawodowy.pl'
}/_next/image`;
