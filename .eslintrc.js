module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-seekui`
  extends: ['seekui'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
