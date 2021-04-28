declare var sails: any;
declare var Logger: any;

const path = require('path');
const nodemailer = require('nodemailer');

const templatesDir = path.join(__dirname, '', 'templates');

const EmailTemplate = require('email-templates').EmailTemplate;

const noreplyEmail = sails.config.noreplyEmail;

const noreplyEmailPass = sails.config.noreplyEmailPass;


module.exports = {

  sendEmailToUser(user:any) {
    Logger.debug('EmailService.sendEmailToUser');

    const template = new EmailTemplate(path.join(templatesDir, 'user-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
    };

    template.render(locals, (err:any, results:any) => {
      if (err) {
        Logger.error(`EmailService.sendEmailToUser at template.render ${err}`);
      }

      transport.sendMail({
        from: `Shell Application ${noreplyEmail}`,
        to: sails.config.email,
        subject: 'Email Subject',
        html: results.html,
        text: results.text,
      }, (transportErr:any, responseStatus:any) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendEmailToUser at transport.sendMail ${transportErr}`);
        }
        Logger.verbose(responseStatus);
        return Logger.verbose(responseStatus);
      });
    });
  },
};
