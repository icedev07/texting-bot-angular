export default {
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.jsonc'],
      options: {
        trailingComma: 'none', //  @Watch https://github.com/prettier/prettier/issues/15956
      },
    },
  ],
};
