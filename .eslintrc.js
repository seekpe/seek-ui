module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-seekui`
  extends: ['seek-ui'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
