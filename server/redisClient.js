var redis = require('redis');
module.exports = function(app){
  var redisConf = app.config.redis;
  // Redis connection setup
  var redisClient = redis.createClient(redisConf.port, redisConf.host, redisConf.options)
  if (process.env.NODE_ENV == 'production') {
    redisClient.auth(app.config.redis.pwd, function(){
      console.log('redis OK');
    })
  }

  redisClient.on("error", function (err) {
      console.log("RedisError: " + err);
  });

  return redisClient;
};
