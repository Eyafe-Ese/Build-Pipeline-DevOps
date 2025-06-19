// karma.conf.js

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'), // ✅ Add this line
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Optional Jasmine config
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/customer-app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    // ✅ Update reporters
    reporters: ['progress', 'kjhtml', 'junit'],

    // ✅ Configure the JUnit reporter
    junitReporter: {
      outputDir: 'test-results', // results will be saved here
      outputFile: 'TESTS-results.xml',
      useBrowserName: false
    },

    browsers: ['ChromeHeadless'], // ✅ Use headless for CI/CD
    restartOnFileChange: true,
    singleRun: true               // ✅ Run once and exit
  });
};
