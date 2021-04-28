declare var sails: any;
declare var Logger: any;
declare var RedisService: any;
declare var User: any;
const redis = require('redis');

const port = sails.config.redis.port;
const redisHost = sails.config.redis.host;
const password = sails.config.redis.password;
let client;

const client2 = redis.createClient({
  port, host: redisHost, password, db: 2,
}); 

module.exports = {

  setUser(userId:string, user:any) {
    Logger.debug('RedisService.setUser');

    user.name = `${user.firstName} ${user.lastName}`;

    client.set([`shell:user:${userId}`, JSON.stringify(user)], (setErr:any) => {
      if (setErr) {
        Logger.error(`RedisService.setUser at client.set ${setErr}`);
      } else {
        const todayEnd = (new Date().setHours(23, 59, 59, 999))/1000;
        client.expireat([`shell:user:${userId}`, parseInt(todayEnd.toString(), 10)], (err:any) => {
          if (err) {
            Logger.error(`RedisService.setUser at client.pexpireat ${err}`);
          }
        });
      }
    });
  },

  getUser(userId:string, callback:any) {
    Logger.debug('RedisService.getUser');
    client.get([`shell:user:${userId}`], (err:any, user:any) => {
      if (err) {
        Logger.error(`RedisService.getUser at client.get ${err}`);
        callback(err);
      } else if (user != null && user !== '') {
        const parseUserObj = JSON.parse(user);
        callback(null, parseUserObj);
      } else {
        User.findActiveById(userId, (findErr:any, usermodel:any) => {
          if (findErr) {
            Logger.error(`RedisService.getUser at User.findActiveById ${findErr}`);
            callback(err, null);
          } else if (!usermodel) {
            Logger.warn('RedisService.getUser at User.findActiveById usermodel undefined');
            callback('User not found', null);
          } else {
            RedisService.setUser(userId, usermodel);
            callback(null, usermodel);
          }
        });
      }
    });
  },

  generateUniqueIdentifier(userId:any, ipAddress:any) {
    Logger.verbose('RedisService.generateUniqueIdentifier');
    return `${userId}:${ipAddress}:${new Date().getMinutes()}`;
    // return `${userId}:${new Date().getMinutes()}`;
  },


  checkRateLimiting(uniqueIdentifier:any, callback:any) {
    Logger.verbose('RedisService.checkRateLimiting');
    Logger.verbose(`uniqueIdentifier: ${uniqueIdentifier}`);
    // Logger.warn(client2);
    client2.get(`${uniqueIdentifier}`, (err:any, noOfReq:any) => {
      Logger.verbose(`noOfReq : ${noOfReq}`);
      if (err) {
        Logger.error(`RedisService.checkRateLimiting at client.get ${err}`);
        callback(err);
      } else if (noOfReq != null && noOfReq !== '' && noOfReq > sails.config.rateLimit.noOfRequest) {
        callback(null, true);
      } else {
        client2.incr(`${uniqueIdentifier}`, (setErr:any, incrVal:any) => {
          Logger.verbose(`incrVal ${incrVal}`);
          if (setErr) {
            Logger.error(`RedisService.setUser at client.set ${setErr}`);
            callback(err);
          } else {
            client2.expire(`${uniqueIdentifier}`, 59, (expireErr:any) => {
              if (expireErr) {
                Logger.error(`RedisService.setUser at client.pexpireat ${expireErr}`);
                callback(err);
              } else {
                callback(null, false);
              }
            });
          }
        });
      }
    });
  },

  setup(callback:any) {
    client = redis.createClient({
      port,
      host:redisHost,
      password,
      enable_offline_queue: false,
      db: 1,
      retry_strategy(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands with a individual error
          return new Error('Retry time exhausted');
        }
        if (options.times_connected > 5) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.max(options.attempt * 100, 10000);
      },
    });

    client.on('error', (err:any) => {
      Logger.error(err);
      callback(err);
    });

    client.on('ready', () => {
      callback(null);
    });

    client.on('reconnecting', () => {
      Logger.info('Reconnecting Redis client..');
    });
  },
};
