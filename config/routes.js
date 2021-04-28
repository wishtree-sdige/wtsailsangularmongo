/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 */

module.exports.routes = {

  /** **************************************************************************
    *  Routes which are used by react should be prefix with api
    *  Example :
    *  Method /api/routeName:{
    *   controller: 'controllerName',
    *   action: 'actionName',
    * }
    *
    * Note: Please update swagger file if route is added
    ************************************************************************** */

  'POST /api/login': {
    controller: 'AuthController',
    action: 'login',
  },

  'POST /api/logout': {
    controller: 'AuthController',
    action: 'logout',
  },

  'POST /api/getUser': {
    controller: 'UserController',
    action: 'getUser',
  },
  'POST /api/getUserList': {
    controller: 'UserController',
    action: 'getUserList',
  },
  'POST /api/editUser': {
    controller: 'UserController',
    action: 'editUser',
  },
  'POST /api/deleteUser': {
    controller: 'UserController',
    action: 'deleteUser',
  },
  'POST /api/registration': {
    controller: 'UserController',
    action: 'registration',
  },

  'POST /api/uploadProfilePic': {
    controller: 'UserController',
    action: 'uploadProfilePic',
  },

  '/api/subscribeNotification': {
    controller: 'NotificationController',
    action: 'subscribeNotification',
  },

  'GET /sendNotification': {
    controller: 'NotificationController',
    action: 'sendNotification',
  },

  'POST /api/verifyCaptcha': {
    controller: 'AuthController',
    action: 'verifyCaptcha',
  },

  'POST /api/validate': {
    controller: 'AuthController',
    action: 'validate',
  },
  'GET /api/v1/auth/facebook': { controller: 'AuthController', action: 'facebookAuth' },
  'GET /facebook/callback': { controller: 'AuthController', action: 'facebookCallback' },

  // Mongoose connection testing routes

  /* 'GET /Admin/getAdmin': { controller: 'AdminController', action: 'findAdmin' },

  'GET /Admin/saveAdmin': { controller: 'AdminController', action: 'saveAdmin' }, */

  // typescript testing routes

  /* 'GET /Type/getAdmin': { controller: 'AdminController', action: 'getAdmin' },

  'GET /Type/saveAdmin': { controller: 'AdminController', action: 'createAdmin' }, */

};
