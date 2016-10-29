/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pick-another-client',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberHammertime: {
      touchActionSelectors: ['button', 'input', 'a', 'textarea'],
      touchActionProperties: 'touch-action: manipulation; -ms-touch-action: manipulation; cursor: pointer;'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'index',
    routeAfterAuthentication: 'jams.new',
    routeIfAlreadyAuthenticated: 'jams.new'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.host = '//localhost:3000'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.host = process.env.PAO_API_ENDPOINT
  }

  return ENV;
};
