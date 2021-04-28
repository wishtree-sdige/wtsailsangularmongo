/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function setup(cb) {
  function logAndExitSails(err, message) {
    console.log(err.message);
    sails.log.error(err.message);
    console.log(message);
    sails.log.error(message);
    return setTimeout(() => {
      process.exit();
    }, 3000);
  }

  try {
    Logger.setup();
  } catch (err) {
    return logAndExitSails(err, 'Logger service failed. Sails process will exit now. You can configure the logger and try again.');
  }
  RedisService.setup((err) => {
    if (err) {
      logAndExitSails(err, 'Redis service setup failed. Sails process will exit now.');
    } else {
      sails.log.info('Redis service setup successfully.');
      const registrationData = {
        firstName: 'Super',
        lastName: 'Admin',
        name: 'Super Admin',
        email: 'superadmin@yopmail.com',
        password: '123456',
        isVerified: true,
      };
      UserService.registration(registrationData, (registrationErr, registeredUSer) => {
        if (registrationErr) {
          if (registrationErr === 'Already Present') {
            sails.log.info('Super Admin exists.');
            cb();
          } else {
            logAndExitSails(registrationErr, 'Error while creating Super Admin. Please contact your Administrator.');
          }
        } else if (!registeredUSer) {
          logAndExitSails(registrationErr, 'Error while creating Super Admin. Please contact your Administrator.');
        } else {
          sails.log.info('Super Admin created successfully.');
          cb();
        }
      });
    }
  });
};
