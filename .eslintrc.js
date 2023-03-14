module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-seek-ui`
  extends: ['seek-ui'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
