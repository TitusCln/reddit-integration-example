const {
  authentication,
  includeBearerToken
} = require('./authentication');

const getHot = require('./triggers/hot');

const createVote = require("./creates/vote");

const createComment = require("./creates/comment");

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
  creates: {
    [createVote.key]: createVote,
    [createComment.key]: createComment
  },
  resources: {},
};
