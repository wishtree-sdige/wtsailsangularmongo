module.exports = function auth(req, res, next) {
  Logger.debug('Policy :: isAuthenticate');

  if (req.isAuthenticated()) {
    const user = req.user;
    req.session.authenticated = true;
    req.session.user = user;
    res.locals.user = {};

    RedisService.getUser(user.id, (err, userObj) => {
      if (err) {
        return res.send({ status: 401, message: 'Please login.' });
      }
      if (userObj != null) {
        if (!userObj.isActive) {
          return res.send({ status: 401, message: 'Please login.' });
        }
        res.locals.user = userObj;
        return next();
      }
      return res.send({ status: 401, message: 'The user session has expired. Please login!' });
    });
  } else {
    if (req.xhr) {
      return res.send({ status: 401, message: 'The user session has expired. Please login!' });
    }
    if (req.session.authenticated === undefined) {
      return res.send({ status: 401, message: 'Please login.' });
    }
    return res.send({ status: 401, message: 'The user session has expired. Please login!' });
  }
};
