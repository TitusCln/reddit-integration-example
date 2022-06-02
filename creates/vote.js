const hot = require('../triggers/hot');

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `https://oauth.reddit.com/api/vote`,
    body: {
      id: bundle.inputData.comment_name,
      dir: 1,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};

module.exports = {
  key: 'vote',
  noun: 'Vote',

  display: {
    label: 'Upvote posts or comments',
    description: 'Votes up a post or a comment on reddit',
  },

  operation: {
    perform,
    inputFields: [
      {
        key: 'link',
        required: true,
        label: 'Link to vote',
        helpText: 'The link for the post or the comment to upvote',
      },
    ],
    outputFields: [],
  },
};
