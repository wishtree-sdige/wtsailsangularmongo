declare var sails: any;
declare var NotificationService: any;
declare var Logger: any;

module.exports = {

  sendNotification(req:any, res:any) {
    Logger.verbose('NotificationController.sendNotification');
    Logger.verbose(req.body);
    const notifyType = 'web';
    const notifyTitle = 'UpdateProfile';
    const notifyLocals = {
      name: 'Pratiksha',
    };
    const notifyTo = [{ id: '5e329b524ca3e41d2ef5a31a' }];
    const isAction = true;
    const actionData = { actionType: 'navigation', action: 'Go to Setting', actionUrl: '/settings' };
    NotificationService.sendNotification(notifyType, notifyTitle, notifyLocals, notifyTo, isAction, actionData, (err:any, notifiedTo:any) => {
      if (err) {
        Logger.error('NotificationController.sendNotification at NotificationService.sendNotification '+err);
        res.send({ status: 300, message: 'serverError' });
      } else {
        Logger.debug(`Notifications sent to ${notifiedTo}`);
        res.send({ status: 200, message: `Notifications sent to ${notifiedTo}` });
      }
    });
  },

  subscribeNotification(req:any, res:any) {
    Logger.verbose('NotificationController.subscribeNotification');
    Logger.verbose(req.body.id);
    if (req.socket && req.body.id) {
      sails.sockets.join(req.socket, req.body.id);
      res.json({ message: `Subscribed to a room called ${req.body.id}!` });
    } else {
      res.json({ message: 'Unauthorized access ' });
    }
  },
  getNotifications(req:any, res:any) {
    Logger.verbose('NotificationController.getNotifications');
    Logger.verbose(req.body);
    const pageNo = req.body.pageNo;
    NotificationService.getNotifications(req.session.user.id, pageNo, (err:any, response:any, count:number) => {
      if (err) {
        res.send({ status: 300, message: 'serverError' });
      } else {
        res.send({ status: 200, response, count });
      }
    });
  },
};
