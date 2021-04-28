declare var sails: any;
declare var User: any;
declare var Logger: any;
declare var NotificationService: any;
const bcrypt = require('bcrypt');

module.exports = {


  async registration(registrationData:any, callback:any) {
    Logger.verbose('UserService.registration');
    User.findActiveByCriteria({ email: registrationData.email, isActive: true, isVerified: true }, (err:any, user:any) => {
      if (err) {
        Logger.error(`UserService.registration at UserService.findActiveByCriteria ${err}`);
        callback(err);
      } else if (user) {
        callback('Already Present');
      } else {
        registrationData.isVerified = true;
        bcrypt.genSalt(10, (bcryptGenSaltErr:any, salt:string) => {
          if (bcryptGenSaltErr) {
            Logger.error('UserService.createUser at bcrypt.genSalt');
            callback(bcryptGenSaltErr);
          } else {
            const password = registrationData.password;
            bcrypt.hash(password, salt, (bcryptErr:any, hash:string) => {
              if (bcryptErr) {
                Logger.error('UserService.setPassword at InternalUser.findActiveById userModel password empty');
                callback(bcryptErr);
              } else {
                registrationData.password = hash;
                User.createUser(registrationData, (createErr:any, userData:any) => {
                  if (createErr) {
                    Logger.error(`UserService.registration at User.create ${createErr}`);
                    callback(err);
                  } else {
                    Logger.info('User details saved successfully.');
                    callback(null, userData);
                  }
                });
              }
            });
          }
        });
      }
    });
  },

  async updateUser(uid:string, updateData:any, callback:any) {
    Logger.verbose('UserService.updateUser');
    User.updateActiveByUId(uid, updateData, (err:any, updatedUser:any) => {
      if (err) {
        Logger.error(`UserService.updateUser at User.updateActiveById ${err}`);
        callback(err);
      } else {
        Logger.info('User details updated successfully.');
        callback(null, updatedUser);
      }
    });
  },
  getUserList(callback:any) {
    Logger.debug('UserService.getUserList');
    User.getUserList((err:any, userData:any) => {
      if (err) {
        Logger.error(`UserService.getUserList at User.getUserList ${err}`);
        callback(err);
      } else {
        Logger.info('User List fetched successfully.');
        callback(null, userData);
      }
    });
  },
  deleteUser(uid:string, userData:any, callback:any) {
    Logger.debug('FAQService.deleteUser');
    User.updateActiveByUId(uid, userData, (err:any, updatedUser:any) => {
      if (err) {
        Logger.error(`UserService.deleteUser at FAQ.updateActiveById ${err}`);
        callback(err);
      } else {
        Logger.info('User deleted successfully.');
        callback(null, updatedUser);
      }
    });
  },
  async updateUserWithNotification(userId:string, updateData:any, callback:any) {
    Logger.verbose('UserService.updateUserWithNotification');
    User.updateActiveById(userId, updateData, (err:any, updatedUser:any) => {
      if (err) {
        Logger.error(`UserService.updateUserWithNotification at User.updateActiveById ${err}`);
        callback(err);
      } else {
        Logger.info('User details updated successfully.');
        callback(null, updatedUser);
        const notifyType = 'web';
        const notifyTitle = 'UpdateProfile';
        const notifyLocals = {
          // You can add parameter that you want pass for template
          // name: 'Pratiksha',
        };
        const notifyTo = [{ id: userId }];
        const isAction = true;
        const actionData = { actionType: 'navigation', action: 'Go to Setting', actionUrl: '/settings' };
        NotificationService.sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, (notificationErr:any, notifiedTo:any) => {
          if (notificationErr) {
            Logger.error(`UserController.editProfile at NotificationService.sendNotification ${notificationErr}`);
          } else {
            Logger.debug(`Notifications sent to ${notifiedTo}`);
          }
        });
      }
    });
  },
};
