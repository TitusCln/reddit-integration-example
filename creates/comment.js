const sample = require('../samples/new_comment');

const perform = async (z, bundle) => {
  if (!re_weburl.test(bundle.inputData.url)) {
    throw new z.errors.Error(`The url provided is not a valid url.`);
  }

  const segments = bundle.inputData.url.split('/');

  let fullNamePrefix = 't3';
  let parentId;
  if (segments.length < 10) {
    parentId = segments[6];
  } else {
    fullNamePrefix = 't1';
    parentId = segments[8];
  }

  const response = await z.request({
    method: 'POST',
    url: 'https://oauth.reddit.com/api/comment',
    body: {
      parent: `${fullNamePrefix}_${parentId}`,
      text: bundle.inputData.comment,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return { sucess: response.data.success };
};

const re_weburl = new RegExp(
  '^' +
    // protocol identifier (optional)
    // short syntax // still required
    '(?:(?:(?:https?|ftp):)?\\/\\/)' +
    // user:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    '(?:' +
    '(?:' +
    '[a-z0-9\\u00a1-\\uffff]' +
    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
    ')?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    // TLD identifier name, may end with dot
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    // port number (optional)
    '(?::\\d{2,5})?' +
    // resource path (optional)
    '(?:[/?#]\\S*)?' +
    '$',
  'i'
);

module.exports = {
  key: 'comment',
  noun: 'Comment',

  display: {
    label: 'Create Comment',
    description: 'Creates a new comment in a post or comment.',
  },

  operation: {
    perform,
    inputFields: [
      {
        key: 'url',
        label: 'Url of the post or comment to comment.',
        required: true,
      },
      {
        key: 'comment',
        label: "The comment's text",
        type: 'text',
        required: true,
      },
    ],
    sample,
    outputFields: [],
  },
};
