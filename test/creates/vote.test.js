const zapier = require('zapier-platform-core');
const nock = require('nock');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('creates.vote', () => {
  beforeAll(() => {
    bundle = {
      authData: {
        access_token: 'token',
      },
      inputData: {
        subreddit: 'Python',
      },
    };

    nock('https://oauth.reddit.com').post(`/api/vote`).reply(200, {});
  });

  it('should run', async () => {
    const results = await appTester(App.creates.vote.operation.perform, bundle);
    expect(results).toStrictEqual({});
  });
});
