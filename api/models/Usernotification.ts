declare var Usernotification: any;

module.exports = {
  tableName: 'shell_usernotification',
  attributes: {
    notifyType: {
      type: 'string',
    },
    notifyTitle: {
      type: 'string',
    },
    notifyLocals: {
      type: 'json',
    },
    isAction: {
      type: 'boolean',
    },
    isRead: {
      type: 'boolean',
    },
    isDelivered: {
      type: 'boolean',
    },
    isActive: {
      type: 'boolean',
      required: true,
    },
  },

  createUsernotification(params:any, callback:any) {
    Usernotification.create(params).fetch().exec((err:any, data:any) => {
      callback(err, data);
    });
  },

  updateActiveById(id:string, params:any, callback:any) {
    Usernotification.update({ where: { id, isActive: true } }, { isRead: true }, (err:any, obj:any) => {
      callback(err, obj);
    });
  },
  findActiveNotificationsByBatch(userid:string, lastNotifyTime:string, batch:any, callback:any) {
    Usernotification.find({
      where: {
        user: userid, createdAt: { $lt: lastNotifyTime }, type: 'Notification', isActive: true,
      },
    }).sort({ createdAt: -1 }).limit(batch).exec((err, notifications) => {
      callback(err, notifications);
    });
  },
  countByCriteria(criteria:any, callback:any) {
    Usernotification.count(criteria).exec((err:any, nos:number) => {
      callback(err, nos);
    });
  },
  findByPaginate(searchTable:any, projection:any, showPage:number, iDisplayLength:number, sortColumn:any, callback:any) {
    Usernotification.find(searchTable, projection).paginate({ page: showPage, limit: iDisplayLength }).sort(sortColumn).exec((err:any, data:any) => {
      callback(err, data);
    });
  },
  async findByCriteria(criterion:any, limit:any, callback:any) {
    const data = await Usernotification.find({ where: criterion, limit }).sort('createdAt DESC');
    callback(null, data);
  },
};
