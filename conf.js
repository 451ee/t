module.exports = {
    general: {
      //  host: '192.168.43.142'
        host: '127.0.0.1'
      , port: 3001
      , url: 'http://127.0.0.1:3001'
    }
  , db: {
        usesDb: true // true - uses db, false - uses not.
      , dbName: 'talker'
      , collectionName: 'chat'
    }
};
