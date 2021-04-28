/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
declare var sails: any;
declare var Logger: any;
declare var Usernotification: any;
declare var User: any;
declare var NotificationService: any;

const assertChai = require('chai').assert;

module.exports = {

  sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, callback) {
    Logger.verbose('NotificationService.sendNotification');

    assertChai.isDefined(notifyType, 'notifyType cannot be undefined');
    assertChai.isDefined(notifyTitle, 'notifyTitle cannot be undefined');
    assertChai.isObject(notifyLocals, 'notifyLocals must be an object');
    assertChai.isArray(notifyTo, 'notifyTo must be an array');

    assertChai.isBoolean(isAction, 'isAction should be a boolean');

    if (!notifyTo.length) {
      return Logger.info('Notification Service: notifyTo empty not sending notification to anyone.');
    }

    if (checkNotifyTemplate(notifyType, notifyTitle, notifyLocals)) {
      sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, callback);
    }
  },
  // Get templates for different types of web notifications . Templates are stored in sails.config.notifyTemplates
  getNotificationTemplate(notification, callback) {
    Logger.verbose('NotificationService.getNotificationTemplate');

    const template = sails.config.notifyTemplates[notification.notifyTitle][notification.notifyType];
    Logger.warn(template);
    const view = setTemplateData(template, notification.notifyLocals);
    return callback(null, view);
  },
  getNotifications(userId, pageNo, callback) {
    Logger.verbose('NotificationService.getNotifications');
    const limit = (pageNo) * sails.config.recordsPerPage;

    Usernotification.findByCriteria({ user: userId }, limit, (err, notificationData) => {
      if (err) {
        Logger.verbose(`NotificationService.getNotifications at Usernotification.findByCriteria err ${err}`);
      } else {
        Usernotification.countByCriteria({ user: userId }, (error, notificationCount) => {
          if (error) {
            Logger.verbose(`NotificationService.getNotifications at Usernotification.countByCriteria err ${err}`);
          } else {
            callback(null, notificationData, notificationCount);
          }
        });
      }
    });
  },
};

function sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, callback) {
  const notifiedTo = [];
  const notifyFailed = [];
  const notifyLength = notifyTo.length;
  for (let i = 0; i < notifyLength; i += 1) {
    const notification = {
      user: notifyTo[i].id,
      notifyType,
      notifyTitle,
      notifyLocals,
      isAction,
      isRead: false,
      isDelivered: false,
      isActive: true,
      type: 'Notification',
      actionData: undefined
    };
    Logger.verbose(notification);
    if (isAction) {
      notification.actionData = actionData;
    }

    Usernotification.createUsernotification(notification, (createErr, notify) => {
      if (createErr) {
        notifyFailed.push(notification.user);
        if ((notifyFailed.length + notifiedTo.length) === notifyLength) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); }
        return;
      }
      Logger.verbose('notification created sucessfully');

      User.findActiveById(notify.user, (findActiveByIdErr, user) => {
        if (findActiveByIdErr || !user) {
          notifyFailed.push(notify.user);
          if ((notifyFailed.length + notifiedTo.length) === notifyLength) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); }
          return;
        }

        User.incrNotificationById(user.id, (incrNotificationByIdErr, updatedUser) => {
          if (incrNotificationByIdErr) {
            notifyFailed.push(notify.user);
            if ((notifyFailed.length + notifiedTo.length) === notifyLength) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); }
            return;
          }

          NotificationService.getNotificationTemplate(notify, (err, template) => {
            if (err || !user) {
              notifyFailed.push(notify.user);
              if ((notifyFailed.length + notifiedTo.length) === notifyLength) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); }
              return;
            }
            notify.template = template;
            Logger.verbose('template', template);
            sails.sockets.broadcast(notify.user, 'notification', {
              badgeCount: updatedUser.notificationBadge,
              notification: [notify],
            });
            notifiedTo.push(notify.user);

            if ((notifyFailed.length + notifiedTo.length) === notifyLength) {
              if (notifyFailed.length) { callback({ errMsg: 'Server Error', notifyFailed }, notifiedTo); } else { callback(null, notifiedTo); }
            }
          });
        });
      });
    });
  }
}

//* ****** Notification Template Methods ******//

function setTemplateData(template, locals) {
  Logger.verbose('NotificationService.setTemplateData');
  for (const key in locals) {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), locals[key]);
  }
  return template;
}

function checkNotifyTemplate(notifyType, notifyTitle, notifyLocals) {
  Logger.verbose('NotificationService.checkNotifyTemplate');
  assertChai.isString(sails.config.notifyTemplates[notifyTitle][notifyType], `notifyTemplate error. template for ${notifyTitle} is missing`);

  const template = sails.config.notifyTemplates[notifyTitle][notifyType];
  const templateParams = template.match(/{{\w+}}/g);

  const createdAt = new Date();
  notifyLocals.createdAt = createdAt.toISOString();
  notifyLocals.displayDate = sails.config.globals.moment(new Date(createdAt)).format('DD MMM, YYYY HH:mm');
  notifyLocals.icon = 'thumb-up gx-text-blue';
  for (let i = 0; i < templateParams.length; i += 1) {
    const templateParam = templateParams[i];
    const templateParam1 = templateParams[i].slice(2, -2);
    assertChai.ok(notifyLocals[templateParam1], `Missing Template Param ${templateParam} in notifyTemplates.js`);
  }
  return true;
}
