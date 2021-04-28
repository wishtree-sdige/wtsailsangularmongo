import { object } from "prop-types";

declare var sails: any;
declare var UserService: any;
declare var Logger: any;
const path = require('path');

const messages = sails.config.messages;

module.exports = {
 registration(req:any, res:any, next: Function):any {
    Logger.verbose('UserController.registration');
    const registrationData:object = req.body;
    Logger.verbose(registrationData);
    UserService.registration(registrationData, (err: any) => {
      if (err) {
        if (err === 'Already Present') {
          res.send({ status: 300, message: messages.alreadyRegisteredUser });
        } else {
          res.send({ status: 300, message: messages.serverError });
        }
      } else {
        res.send({ status: 200, message: messages.registeredUserSuccess });
      }
    });
  },

  getUser(req:any, res:any, next: Function):any {
    Logger.verbose('UserController.getUser');
    // Logger.verbose(res.locals.user);
    res.send({ status: 200, user: res.locals.user });
  },

  editUser(req:any, res:any, next: Function):any {
    Logger.debug('UserController.editUser');
    const userData = req.body;
    Logger.verbose(userData);
    const uId = userData.uid;
    req.file('file').upload({
      dirname: path.resolve(sails.config.appPath, 'assets/userProfilePic'),
      saveAs: req.session.user.uid,
    }, (err: any, files: any[]) => {
      if (err) {
        Logger.error(`UserController.uploadProfilePic at req.file ${err}`);
        return res.send({ status: 300, message: messages.serverError });
      }
      if (files.length !== 0) {
        const file = files[0];
        const fileLocArray = file.fd.split('/');
        const fileLoc = fileLocArray[fileLocArray.length - 1];
        const uploadFile = {
          uid: req.session.user.uid,
          size: file.size,
          type: file.type,
          name: file.filename,
          url: `/userProfilePic/${fileLoc}`,
          status: 'done',
        };
        Logger.verbose(uploadFile);
        userData.profilePic = uploadFile;
      }
      UserService.updateUser(uId, userData, (updateErr: any, updatedUser: any) => {
        if (updateErr) {
          res.send({ status: 300, message: messages.serverError });
        } else {
          res.send({ status: 200, message: messages.userUpdatedSuccess, data: updatedUser });
        }
      });
    });
  },
 deleteUser(req:any, res:any, next: Function):any {
    Logger.debug('UserController.deleteUser');
    const uid = req.body.id;
    Logger.verbose(uid);
    if (!uid) {
      res.send({ status: 300, message: 'serverError' });
    } else {
      UserService.deleteUser(uid, { isActive: false }, (err: any, deletedUser: any) => {
        if (err) {
          res.send({ status: 300, message: 'serverError' });
        } else {
          res.send({ status: 200, response: deletedUser, message: 'deleteUserSuccess' });
        }
      });
    }
  },

   uploadProfilePic(req:any, res:any, next: Function):any {
    Logger.verbose('UserController.uploadProfilePic');
    Logger.verbose(req.body);
    req.file('file').upload({
      dirname: path.resolve(sails.config.appPath, 'assets/userProfilePic'),
      saveAs: req.session.user.uid,
    }, (err: any, files: any[]) => {
      if (err) {
        Logger.error(`UserController.uploadProfilePic at req.file ${err}`);
        res.send({ status: 300, message: messages.serverError });
      } else if (files.length === 0) {
        res.send({ status: 300, message: messages.profilePicNotFound });
      } else {
        const file = files[0];
        const fileLocArray = file.fd.split('/');
        const fileLoc = fileLocArray[fileLocArray.length - 1];
        const uploadFile = {
          uid: req.session.user.uid,
          size: file.size,
          type: file.type,
          name: file.filename,
          url: `/userProfilePic/${fileLoc}`,
          status: 'done',
        };
        Logger.verbose(uploadFile);
        UserService.updateUser(req.session.user.uid, { profilePic: uploadFile }, (editProfileErr: any, editedProfile: any) => {
          if (editProfileErr) {
            Logger.debug(`UserController.editProfile at UserService.editProfile err ${editProfileErr}`);
            res.send({ status: 300, message: 'serverError' });
          } else {
            res.send({ status: 200, message: messages.uploadProfilePicSuccess, user: editedProfile });
          }
        });
      }
    });
  },

    getUserList(req:any, res:any, next: Function):any {
    Logger.verbose('UserController.getUser');
    UserService.getUserList((err: any, userData: any) => {
      if (err) {
        res.send({ status: 300, message: 'serverError' });
      } else {
        res.send({ status: 200, data: userData });
      }
    });
  }

};