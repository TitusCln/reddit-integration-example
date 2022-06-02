module.exports = {
  Auth: {
    CLIENT_ID: process.env.CLIENT_ID || '1234',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '293920swe',
    BASIC_AUTH: `Basic ${Buffer.from(
      process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
    ).toString('base64')}`,
  },
};
