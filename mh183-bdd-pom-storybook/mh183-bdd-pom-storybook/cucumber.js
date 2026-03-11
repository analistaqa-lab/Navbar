module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/hooks/**/*.ts', 'features/step-definitions/**/*.ts'],
    format: [
      'progress-bar',
      'summary',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    paths: ['features/**/*.feature'],
    publishQuiet: true,
    parallel: 1,
    retry: 0
  }
};
