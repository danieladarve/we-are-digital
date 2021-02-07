module.exports = {
  root: true,
  'extends': [
    "plugin:vue/essential",
    'plugin:prettier/recommended',
    "eslint:recommended"
  ],
  'plugins': [
    'prettier'
  ],
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest': true,
    'node': true
  },
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['off'],
    'import/prefer-default-export': 'off',
    'max-len': 'off'
  }
}
