/* jshint node: true */
var VALID_DEPLOY_TARGETS = ['production'];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {},
    s3: {
      accessKeyId: process.env.PAO_AWS_KEY,
      secretAccessKey: process.env.PAO_AWS_SECRET,
      bucket: process.env.PAO_AWS_BUCKET,
      region: process.env.PAO_AWS_REGION
    },
    's3-index': {
      accessKeyId: process.env.PAO_AWS_KEY,
      secretAccessKey: process.env.PAO_AWS_SECRET,
      bucket: process.env.PAO_AWS_BUCKET,
      region: process.env.PAO_AWS_REGION
    },
    cloudfront: {
      accessKeyId: process.env.PAO_AWS_KEY,
      secretAccessKey: process.env.PAO_AWS_SECRET,
      distribution: process.env.PAO_AWS_DISTRIBUTION
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
