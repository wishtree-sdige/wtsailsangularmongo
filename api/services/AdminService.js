/*
const AdminSchema = require('../models/Admin');

const AdminUser = sails.config.globals.Mongoose.model('Admin', AdminSchema);

module.exports = {

  async createAdmin(input, callback) {
    Logger.verbose('AdminService.createAdmin');
    // Need yo expore more about how to use models methods in mongoose
    AdminUser.create(input, (err, admin) => {
      callback(err, admin);
    });
  },

  async findAdmin(callback) {
    Logger.verbose('AdminService.findAdmin');
    AdminUser.find((err, admins) => callback(err, admins));
  },
};
 */
