/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    lessOptions: {
      paths: ['app/styles']
    },
    babel: {
      optional: ['es7.decorators'],
      plugins: ["transform-decorators-legacy"],
      presets: ["es2015", "stage-2"] // need dependencies: ["babel-preset-es2015", "babel-preset-stage-2"]
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    autoprefixer: {
      browsers: ['last 2 ios version'],
      cascade: false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('vendor/toastr/build/toastr.min.css');
  app.import('vendor/toastr/build/toastr.min.js');
  return app.toTree();
};
