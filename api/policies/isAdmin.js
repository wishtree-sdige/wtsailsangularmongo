module.exports = function isAdmin(req, res, next) {
  Logger.debug('Policy.isAdmin');

  if (req.session.user) {
    if (Object.prototype.hasOwnProperty.call(req.session.user, 'role')) {
      if (req.session.user.role === 'Super Admin') {
        return next();
      }
      return res.send({ status: 403, message: 'You are not authorized to view this page or resource.' });
    }
    return res.send({ status: 401, message: 'Please login.' });
  }
  return res.send({ status: 401, message: 'Please login.' });
};
