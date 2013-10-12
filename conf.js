module.exports = {
    general: {
      //  host: '192.168.43.142'
        host: '127.0.0.1' // notice the missing "http://"
      , port: 3001
      , url: 'http://127.0.0.1:3001'
    }
  , db: {
        usesDb: true // true - uses db, false - uses not. // IF TALKER WON'T START, START DEBUGGING FROM HERE
      , dbName: 'talker'
      , collectionName: 'chat'
    }
};
