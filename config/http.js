const pass = require('passport');

const Raven = require('raven');

Raven.config('https://42493d9c21cf444aa2a751745a0527a3@sentry.io/5171306').install();

module.exports.http = {

  middleware: {

    passportInit: pass.initialize(),
    passportSession: pass.session(),

    // Raven's handlers has to be added as a keys to http.middleware config object
    requestHandler: Raven.requestHandler(),
    errorHandler: Raven.errorHandler(),

    order: [
      'requestHandler', // The request handler must be the very first one
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'myRequestLogger',
      // 'rateLimiting',
      'bodyParser',
      'compress',
      'poweredBy',
      '$custom',
      'router',
      'errorHandler', // The error handler must be after router, but before any other error middleware
      'www',
      'favicon',
    ],

    myRequestLogger(req, res, next) {
      const url = req.url;
      Logger.info(`Request Time : ${new Date()} : ${url}`);
      Logger.info(`Request Method : ${req.method}`);

      AuditLogService.auditLog(req, (err) => {
        if (err) {
          Logger.error(`http.myRequestLogger : audit logging failed ${err}`);
        // next();
        }
      });
      next();
    },


    /* rateLimiting(req, res, next) {
      Logger.verbose('rateLimiting');
      Logger.verbose(req.url);
      if (req.session.user && req.session.user.ratelimitexceeded) {
        Logger.warn('Rate limit issue sending 429 status code');
        res.send({ status: 429 });
      } else if (req.session.user && req.session.user.id) {
        Logger.verbose(`user id : ${req.session.user.id}`);
        Logger.verbose(`ip address : ${req.ip}`);
        const uniqueIdentifier = RedisService.generateUniqueIdentifier(req.session.user.id, req.ip);
        RedisService.checkRateLimiting(uniqueIdentifier, (err, isNoOfRequestExceed) => {
          if (err) {
            Logger.error(`http.rateLimiting at RedisService.checkRateLimiting ${err}`);
          } else if (isNoOfRequestExceed) {
            Logger.warn('Rate limit issue sending 429 status code');
            req.session.user.ratelimitexceeded = true;
            res.send({ status: 429 });
          } else {
            next();
          }
        });
      } else {
        next();
      }
    }, */

  },

};
