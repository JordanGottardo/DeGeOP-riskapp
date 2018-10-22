module.exports = function(config) {
  config.set({
    basePath: '../',

    files: [
      { pattern: 'test/**/*.ts' },
      { pattern: 'source/**/*.ts' },
      { pattern: 'test/**/*.tsx' },
      { pattern: 'source/**/*.tsx' },
    ],

    preprocessors: {
      '**/*.ts': ['karma-typescript'],
      '**/*.tsx': ['karma-typescript']
    },

    frameworks: ['jasmine', 'sinon', 'karma-typescript'],
    reporters: ['progress', 'karma-typescript'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    client: {
      captureConsole: false,
    },

    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,

    karmaTypescriptConfig: {
      bundlerOptions: {
        exclude: [
          'react-addons-test-utils',
          'react/addons',
          'react/lib/ExecutionEnvironment',
          'react/lib/ReactContext'
        ],
        entrypoints: /.*test\/.*\.(ts|tsx)$/,
      }
    }
  })
};
