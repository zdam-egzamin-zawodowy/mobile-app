import Config from 'react-native-config';

const buildURL = (type: 'cdn' | 'cdnimg' | 'email', path: string): string => {
  switch (type) {
    case 'cdn':
      return Config.CDN_URL + '/' + path;
    case 'cdnimg':
      return `${Config.WEBSITE}/_next/image?url=${
        Config.CDN_URL + '/' + encodeURIComponent(path)
      }&w=640&q=75`;
    case 'email':
      return `mailto:${path}`;
  }
  return path;
};

export default buildURL;
