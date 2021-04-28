/*
const AdminSchema = new sails.config.globals.Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
},
{
  collection: 'shell_admin',
});

AdminSchema.methods.createAdmin = function createAdmin(params, callback) {
  AdminSchema.create(params, (err, admin) => {
    callback(err, admin);
  });
};

module.exports = AdminSchema;

// module.exports = sails.config.globals.Mongoose.model('Admin', AdminSchema);
 */
