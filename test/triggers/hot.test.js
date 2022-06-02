const zapier = require('zapier-platform-core');
const hotMockedResponse = require('../fixtures/responses/hotResponse.json');
const nock = require('nock');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('triggers.best', () => {
  let bundle;

  beforeAll(() => {
    bundle = {
      authData: {
        access_token: 'token',
      },
      inputData: {
        subreddit: 'Python',
      },
    };

    nock('https://oauth.reddit.com')
      .get(`/r/${bundle.inputData.subreddit}/hot`)
      .reply(200, hotMockedResponse);
  });

  it('should run', async () => {
    const results = await appTester(App.triggers.hot.operation.perform, bundle);
    expect(results.length).toBe(1);
    expect(results[0].subreddit).toBe('Python');
  });
});
