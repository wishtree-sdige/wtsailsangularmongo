const ObjectID = require('mongodb').ObjectID;
declare var sails: any;
declare var User: any;

module.exports = {
  tableName: 'shell_user',
  attributes: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
    },
    isVerified: {
      type: 'boolean',
      defaultsTo: false,
    },
    role: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
    uid: {
      type: 'string',
    },
  },

  /* customToJSON() {
    // omit createdAt, deletedAt, _id etc
    return _.omit(this, ['password']);
  }, */

  beforeCreate(valuesToSet:any, proceed:Function) {
    // Generate unique id using npm module uniqid
    valuesToSet.uid = sails.config.globals.uniqid.process();
    return proceed();
  },

  async findActiveByCriteria(criterion:any, callback:any) {
    try {
      const data = await User.findOne(criterion);
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
  },

  async createUser(values:any, callback:any) {
    try {
      const createdRecord = await User.create(values).fetch();
      return callback(null, createdRecord);
    } catch (error) {
      return callback(error);
    }
  },

  async findActiveById(id:string, callback:any) {
    try {
      const data = await User.findOne({ id, isActive: true });
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
  },
  async getUserList(callback:any) {
    try {
      const data = await User.find({ isActive: true });
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
  },
  async updateActiveById(id:string, userData:any, callback:any) {
    const updatedRecord = await User.updateOne({ id, isActive: true }).set(userData);
    return callback(null, updatedRecord);
  },
  async updateActiveByUId(uid:string, userData:any, callback:any) {
    const updatedRecord = await User.updateOne({ uid, isActive: true }).set(userData);
    return callback(null, updatedRecord);
  },

  incrNotificationById(userId:string, callback:any) {
    User.native((err:any, collection:any) => {
      if (err) {
        callback(err, null);
      }
      collection.update({ _id: new ObjectID(userId), isActive: true }, { $inc: { notificationBadge: 1 } }, (updateErr:any) => {
        if (!updateErr) {
          User.findActiveById(userId, (findErr:any, data:any) => {
            callback(findErr, data);
          });
        } else {
          callback(updateErr);
        }
      });
    });
  },
};
