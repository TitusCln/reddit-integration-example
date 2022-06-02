const sample = require('../samples/hot-sample')

const perform = async (z, bundle) => {

  const response = await z.request({
    url: `https://oauth.reddit.com/r/${bundle.inputData.subreddit}/hot`});

  return response.data.data.children.map(comment => comment.data);
};

module.exports = {
  key: 'hot',
  noun: 'Hot',

  display: {
    label: 'New Hot posts on a subreddit',
    description: 'Triggers when a new hot posts on a subreddit are found.'
  },

  operation: {
    perform,
    inputFields: [{ key: 'subreddit', type: 'string', label: 'The subreddit to look for the posts (do not include \'/r\'', required: true }],
    sample,
    outputFields: []
  }
};
