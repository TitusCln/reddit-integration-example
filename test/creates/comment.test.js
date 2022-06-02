const zapier = require('zapier-platform-core');
const nock = require('nock');
const sampleResponse = require('../fixtures/responses/commentResponse.json');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('creates.comment', () => {
  beforeAll(() => {
    bundle = {
      authData: {
        access_token: 'token',
      },
      inputData: {
        url: 'https://www.reddit.com/r/Python/comments/v3hihm/python_books_for_beginners/',
        comment: 'this is a comment',
      },
    };

    nock('https://oauth.reddit.com')
      .post(`/api/comment`)
      .reply(200, sampleResponse);
  });

  it('should run', async () => {
    const results = await appTester(
      App.creates.comment.operation.perform,
      bundle
    );
    expect(results.success).toBe(true);
  });
});
