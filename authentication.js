'use strict';

const getAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    body: {
      grant_type: 'authorization_code',
      code: bundle.inputData.code,
      redirect_uri: bundle.inputData.redirect_uri,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        process.env.CLIENT_ID +
          ':' +
          process.env.CLIENT_SECRET
      ).toString('base64')}`,
    },
  });

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
};

const refreshAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    body: {
      grant_type: 'refresh_token',
      refresh_token: bundle.authData.refresh_token,
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        process.env.CLIENT_ID +
          ':' +
          process.env.CLIENT_SECRET
      ).toString('base64')}`,
    },
  });

  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
};

const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }
  return request;
};

const testAuth = async (z, bundle) => {
  const meResponse = await z.request({
    url: 'https://oauth.reddit.com/api/v1/me',
  });
  meResponse.throwForStatus();

  return meResponse.display_name;
};

const authentication = {
  type: 'oauth2',
  oauth2Config: {
    authorizeUrl: {
      url: 'https://www.reddit.com/api/v1/authorize',
      params: {
        client_id: process.env.CLIENT_ID,
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
        scope: 'identity submit save read vote',
        duration: 'permanent',
      },
    },
    getAccessToken,
    refreshAccessToken,
    autoRefresh: true,
  },
  fields: [],
  test: testAuth,
  connectionLabel: testAuth,
};

module.exports = {
  authentication,
  includeBearerToken,
};
