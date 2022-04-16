module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of
      // React to use
      version: 'detect',
    },
  },
  extends: [
    'next',
    // Uses the recommended rules from @eslint-plugin-react
    'plugin:react/recommended',

    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier',

    // Enables eslint-plugin-prettier and eslint-config-prettier. This will
    // display prettier errors as ESLint errors. Make sure this is always
    // the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    // Use template strings instead of string concatenation
    'prefer-template': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Place to specify ESLint rules. Can be used to overwrite rules
    // specified from the extended configs

    // We're using TypeScript, so prop-types aren't so interesting
    'react/prop-types': 'off',

    'react/react-in-jsx-scope': 'off',

    '@next/next/no-img-element': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // This is documented as the default, but apparently now needs to be
    // set explicitly
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
