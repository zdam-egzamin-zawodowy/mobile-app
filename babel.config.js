module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          common: './src/common',
          config: './src/config',
          libs: './src/libs',
          screens: './src/screens',
          utils: './src/utils',
        },
      },
    ],
  ],
};
