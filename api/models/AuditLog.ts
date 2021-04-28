module.exports = {
  tableName: 'shell_auditLog',
  attributes: {
    requestTime: {
      type: 'string',
      // columnType: 'date',
    },
    userId: {
      type: 'string',
    },
    userRole: {
      type: 'string',
    },
    action: {
      type: 'string',
    },
    remoteAddress: {
      type: 'string',
    },
    method: {
      type: 'string',
    },
    source: {
      type: 'string',
    },
  },
};
