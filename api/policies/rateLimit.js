module.exports = function rateLimit(req, res, next) {
  Logger.debug('Policy.rateLimit');

  if (req.session.user && req.session.user.ratelimitexceeded && req.url === '/api/verifyCaptcha') {
    Logger.warn('Request to verify captcha...');
    return next();
  }

  if (req.session.user && req.session.user.ratelimitexceeded) {
    Logger.warn('Rate limit issue sending 429 status code');
    return res.send({ status: 429 });
  }

  if (req.session.user && req.session.user.id) {
    Logger.verbose(`user id : ${req.session.user.id}`);
    Logger.verbose(`ip address : ${req.ip}`);
    const uniqueIdentifier = RedisService.generateUniqueIdentifier(req.session.user.id, req.ip);
    RedisService.checkRateLimiting(uniqueIdentifier, (err, isNoOfRequestExceed) => {
      if (err) {
        Logger.error(`http.rateLimiting at RedisService.checkRateLimiting ${err}`);
        return next();
      }
      if (isNoOfRequestExceed) {
        Logger.warn('Rate limit issue sending 429 status code');
        req.session.user.ratelimitexceeded = true;
        return res.send({ status: 429 });
      }
      return next();
    });
  } else {
    return next();
  }
};
