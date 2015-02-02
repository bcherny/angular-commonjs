module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['Chrome'],
    client: {
      captureConsole: true
    },
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'dist/index.js',
      'dist/test.js'
    ],
    logLevel: config.LOG_DEBUG
  })
}