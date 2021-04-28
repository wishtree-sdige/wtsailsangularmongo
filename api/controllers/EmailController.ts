declare var sails: any;
declare var EmailService: any;
declare var Logger: any;
const Agenda = require('agenda');
const dbuser = sails.config.datastores.mongoServer.user;
const dbpassword = sails.config.datastores.mongoServer.password;
const host = sails.config.datastores.mongoServer.host;
const database = sails.config.datastores.mongoServer.database;
let mongoConnectionString = `mongodb://${host}/${database}`;

if (dbuser != null && dbuser !== '') {
  mongoConnectionString = `mongodb://${dbuser}:${dbpassword}@${host}/${database}`;
}

// Logger.verbose(`mongoConnectionString : ${mongoConnectionString}`);

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('sendEmailToUser', (job:any, done:Function) => {
  Logger.verbose('EmailController.Agenda.sendEmailToUser');
  const user = {
    firstName: 'Pratiksha',
    lastName: 'Lokhande',
  };
  // EmailService.sendEmailToUser(user);
  done();
});

agenda.on('ready', () => {
  // Note: Mention time when you want to execute
  agenda.every('8 hours', 'sendEmailToUser');
  agenda.start();
});

module.exports = {
};
