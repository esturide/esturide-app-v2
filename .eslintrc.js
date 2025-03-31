module.exports = {
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: [
        'libs/**/*.ts,*.js',
        'styles/**/*.js',
        'components/**/*.ts,*.js,*.tsx,*.jsx',
        'app/**/*.tsx',
      ],
      rules: {
        'react/prop-types': 'warn',
      },
    },
  ],
};
