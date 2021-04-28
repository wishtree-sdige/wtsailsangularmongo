/**
    * Development environment settings
    *
    * This file can include shared settings for a development team, such as API keys or remote database passwords.
    * If you're using a version control solution for your Sails app, this file will be committed to your repository
    * unless you add it to your .gitignore file.
    * If your repository will be publicly viewable, don't add any private information to this file!
    *
 */

module.exports = {

  baseURL: 'http://192.168.1.15:8080',

  APIURL: 'http://192.168.1.15:1337',

  noreplyEmail: 'noreply@wishtreetech.com',
  noreplyEmailPass: 'm3ss3ng34',
  email: 'pratiksha.lokhande@wishtreetech.com',

  /** *************************************************************************                                                                      *
      * Database Connection
      *                                                                          *
      * 1. Choose an adapter:                                                    *
      *    https://sailsjs.com/plugins/databases                                 *
      *                                                                          *
      * 2. Install it as a dependency of your Sails app.                         *
      *    (For example:  npm install sails-mongo --save)                        *
      *                                                                          *
      * 3. Then pass it in, along with a connection URL.                         *
      *    (See https://sailsjs.com/config/datastores for help.)                 *
      *                                                                          *
      ************************************************************************** */
  datastores: {
    mongoServer: {
      adapter: 'sails-mongo',
      url: 'mongodb://172.17.0.1:27019/Shell',
    },
  },

  /** *************************************************************************************************
     * Logger Configuration
     * This should have the following configuration -
     * 1. logLevelConfig - should have all the levels : debug, info, warn, error. Every level must have a channels key with
     *    an array value. You can define the channels in this array.
     * 2. channels - should have configurations for every channel specified in `logLevelConfig`. Each channel should
     *    have the key as its name and type field which can be one of the following values - slack, email, console, file.
     * 3. console is the default channel that requires no configuration in `channels`.
     * 4. file channel should have the following  fields :`fileName` - filePath of the log file to be used.
     **************************************************************************************************** */

  logger: {
    channels: {
      file: {
        type: 'file',
        fileName: 'Shell_Logs/shell.log',
      },
      errorFile: {
        type: 'file',
        fileName: 'Shell_Logs/error.shell.log',
      },
    },

    logLevelConfig: {
      verbose: {
        channels: ['console'],
      },
      debug: {
        channels: ['console'],
      },
      info: {
        channels: ['console'],
      },
      warn: {
        channels: ['console'],
      },
      error: {
        channels: ['console', 'file', 'errorFile'],
      },
    },
  },

  security: {
    cors: {
      allRoutes: true,
      allowOrigins: ['http://172.17.0.1:1337', 'http://172.17.0.1:8080', 'http://192.168.1.20:1337', 'http://192.168.1.20:8080', 'http://192.168.1.15:1337', 'http://192.168.1.15:8080'],
      allowCredentials: true,
      allowAnyOriginWithCredentialsUnsafe: true,
      allowRequestMethods: 'GET, POST, OPTIONS, HEAD',
      allowRequestHeaders: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin',
      allowResponseHeaders: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin',
    },
  },

  redis: {
    port: 6379,
    host: 'localhost',
    password: '',
  },

  rateLimit: {
    noOfRequest: 5,
    timeInterval: 60,
  },
};
