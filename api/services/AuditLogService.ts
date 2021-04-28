declare var AuditLog: any;
declare var Logger: any;

module.exports = {

  auditLog(req:any, callback:any) {
    try {
      let url = req.url;

      // Logger.info(`Request Time : ${new Date()} : ${url}`);

      req.connection.setTimeout(3 * 60 * 1000);

      const method = req.method;
      // Logger.info(`Request Method : ${method}`);


      const userAgent = req.headers['user-agent'];
      const contentType = req.headers['content-type'];

      let userId = '';
      let userRole = '';

      if (req.session && req.session.user !== undefined) {
        userId = req.session.user.id;
        userRole = req.session.user.role;
      } else {
        userId = 'Guest';
        userRole = 'Guest';
      }

      const enterDate = new Date();
      const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      const index = url.indexOf('?');

      if (index > -1) { url = url.substring(0, index); }
      if (url === '') { url = '/login'; }

      let source;


      if (url.indexOf('/api/') === 0) {
        source = 'React App';
      } else {
        source = 'Sails';
      }

      const queryParams = req.query;
      const auditLog = {
        requestTime: enterDate,
        userId,
        userRole,
        action: url,
        remoteAddress,
        method,
        source,
        userAgent,
        queryParams,
        contentType,
        bodyParams:null
      };

      if (contentType !== 'multipart/form-data' && method === 'POST' && req.body) {
        const bodyParams = JSON.parse(JSON.stringify(req.body));
        delete bodyParams.password;
        auditLog.bodyParams = bodyParams;
      }

      AuditLog.create(auditLog).fetch().exec((err:any) => {
        if (err) {
          Logger.error(`AuditLogService.auditLog at AuditLog.create: audit logging failed ${err}`);
          callback(err);
        } else {
          callback(null);
        }
      });
    } catch (catchErr) {
      Logger.error(`AuditLogService.auditLog at catch block: audit logging failed ${catchErr}`);
      callback(catchErr);
    }
  },
};
