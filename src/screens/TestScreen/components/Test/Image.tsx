import React, { useState, Fragment } from 'react';
import buildURL from 'utils/buildURL';

import {
  Image,
  StyleSheet,
  useWindowDimensions,
  ImageProps as RNImageProps,
} from 'react-native';
import { H3 } from 'native-base';

export interface ImageProps extends Pick<RNImageProps, 'style'> {
  path: string;
}

const MyImage = ({ path, style }: ImageProps) => {
  const [loading, setLoading] = useState(true);
  const height = useWindowDimensions().height;
  const imageHeight = height / 3;

  return (
    <Fragment>
      {loading && (
        <H3 style={[{ minHeight: imageHeight }, styles.heading]}>
          Ładowanie obrazka...
        </H3>
      )}
      <Image
        source={{ uri: buildURL('cdnimg', path) }}
        style={[
          { height: imageHeight, display: loading ? 'none' : undefined },
          styles.image,
          style,
        ]}
        resizeMode="contain"
        onLoadEnd={() => setLoading(false)}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default MyImage;
