const {
  authentication,
  includeBearerToken
} = require('./authentication');

const getHot = require('./triggers/hot');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [includeBearerToken],

  afterResponse: [],

  triggers: {
    [getHot.key]: getHot,
  },
  searches: {},
  creates: {},
  resources: {},
};
