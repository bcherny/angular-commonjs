module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      // 'bower_components/angular-mocks/angular-mocks.js',
      'dist/index.js',
      'dist/test.js'
    ]
  })
}