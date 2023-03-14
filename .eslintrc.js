module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-seekdev`
  extends: ['seekdev'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
