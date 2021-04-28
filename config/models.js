module.exports.models = {

  datastore: 'mongoServer', // For MongoDB

  // datastore: 'MySQLServer', // For MySQL

  // schema: true,

  migrate: 'safe', // For MongoDB

  // migrate: 'alter', // For MySQL

  attributes: {

    // ---------------------------- MongoDB --------------------------------
    createdAt: { type: 'ref', columnType: 'datetime', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'datetime', autoUpdatedAt: true },
    id: { type: 'string', columnName: '_id' },

    // ---------------------------- MySQL --------------------------------
    /* id: { type: 'number', autoIncrement: true },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true }, */

  },

  dataEncryptionKeys: {
    default: '/3+d2D4gk7DJRG3yzrPnJlZDMmsXdjug7fpKJmjrbWE=',
  },

  cascadeOnDestroy: true,


};
