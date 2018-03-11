module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:react-native/all'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  rules: {
    'react-native/no-color-literals': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
