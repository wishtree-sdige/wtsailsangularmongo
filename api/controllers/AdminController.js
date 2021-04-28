/* const messages = sails.config.messages;
const AdminService = require('../services/AdminService.js');

module.exports = {

  findAdmin(req, res) {
    Logger.verbose('AdminController.findAdmin');
    AdminService.findAdmin((err, admins) => {
      if (err) {
        return res.send({ status: 300, message: messages.serverError });
      }
      return res.send({ status: 200, admins });
    });
  },

  saveAdmin(req, res) {
    Logger.verbose('AdminController.saveAdmin');
    AdminService.createAdmin({ username: 'Admin', email: 'admin@yopmail.com' }, (err, admin) => {
      if (err) {
        return res.send({ status: 300, message: messages.serverError });
      }
      return res.send({ status: 200, admin });
    });
  },

};
 */
