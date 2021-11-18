module.exports = {
  servers: {
    one: {
      host: 'uhmtheclubforyou.xyz',
      username: 'root',
      password: '314Theclubforyou'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'The-Club-For-You',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://uhmtheclubforyou.xyz',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  proxy: {
    domains: 'uhmtheclubforyou.xyz',
    ssl: {
      // Enable let's encrypt to create free certificates.
      // The email is used by Let's Encrypt to notify you when the
      // certificates are close to expiring.
      forceSSL: true,
      letsEncryptEmail: 'jingzhef@hawaii.edu'
    }
  },
  mongo: { version: '3.4.1', servers: { one: {} }
  },
};
