import { CDN_URI, IMAGE_RESIZING_SERVICE } from 'config/cdn';

const buildURL = (type: 'cdn' | 'cdnimg', path: string): string => {
  switch (type) {
    case 'cdn':
      return CDN_URI + path;
    case 'cdnimg':
      return (
        IMAGE_RESIZING_SERVICE +
        `?url=${CDN_URI + encodeURIComponent(path)}&w=640&q=75`
      );
  }
  return path;
};

export default buildURL;
