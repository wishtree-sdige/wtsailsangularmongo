/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  /** *************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ************************************************************************** */
  secret: '3d7f4764a26a33920f68673e1a2ba29a',

  cookie: {
    // Cookie expiration in milliseconds.
    // For example, use 24 * 60 * 60 * 1000 to make sessions expire in 24 hours.
    // Default is null, making it a browser cookie, so the session will
    // last only for as long as the browser is open.
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
    rolling: true,
    // Should the session cookie be HTTP-only? (See https://www.owasp.org/index.php/HttpOnly)
    // httpOnly: true,
    // Should the session cookie be secure? (only valid for HTTPS sites)
    // secure: false,
  },

  adapter: 'redis',
  host: 'localhost',
  port: 6379,
  ttl: 24 * 60 * 60 * 1000,
  db: 0,
  pass: '',
  prefix: 'shell:sessions:',
};
