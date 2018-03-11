module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  extends: ['plugin:react/recommended', 'plugin:react-native/all'],
  rules: {
    'react-native/no-color-literals': 'off',
  }
};
