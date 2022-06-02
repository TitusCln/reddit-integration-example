const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');

const getHot = require('./triggers/hot');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [...befores],

  afterResponse: [...afters],

  triggers: {
    [getHot.key]: getHot,
  },
  searches: {},
  creates: {},
  resources: {},
};
