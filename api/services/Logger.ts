declare var sails: any;

const winston = require('winston');
const assert = require('assert');
const util = require('util');
const Raven = require('raven');

const levelColor = {
  verbose: 'green', debug: 'cyan', info: 'white', warn: 'yellow', error: 'red',
};

const logLevels = {
  verbose: 0, debug: 1, info: 2, warn: 3, error: 4,
};

const fileLoggers = {};

const channelConfigValidation = {
  file(loggerConfig:any, channel:string) {
    assert.ok(loggerConfig.channels[channel].fileName, `No fileName specified for File channel ${channel}`);
  },
  sentry(loggerConfig:any, channel:string) {
    assert.ok(loggerConfig.channels[channel].dsn, `No dsn(key) specified for Sentry channel ${channel}`);
  },
};


const channelDefinition = {

  console(msg:any, level:any) {
    const method = levelColor[level];
    console.log(msg[method]);
  },
  file(msg:any, channel:any, channelConfig:any, level:any) {
    if (fileLoggers[channel]) {
      fileLoggers[channel][level](msg);
    } else {
      const logger = new (winston.Logger)({
        transports: [],
      });

      logger.add(winston.transports.DailyRotateFile, {
        filename: channelConfig.fileName,
        level: 'silly',
        datePattern: '-dd-MM-yyyy',
        handleExceptions: true,
        exitOnError: false,
      });

      fileLoggers[channel] = logger;
      logger[level](msg);
    }
  },
  errorFile(msg:any, channel:any, channelConfig:any, level:any) {
    if (fileLoggers[channel]) {
      fileLoggers[channel][level](msg);
    } else {
      const logger = new (winston.Logger)({
        transports: [],
      });

      logger.add(winston.transports.DailyRotateFile, {
        filename: channelConfig.fileName,
        level: 'silly',
        datePattern: '-dd-MM-yyyy',
        handleExceptions: true,
        exitOnError: false,
      });

      fileLoggers[channel] = logger;
      logger[level](msg);
    }
  },

  sentry(msg:any, channel:any, channelConfig:any, level:any) {
    Raven.config(channelConfig.dsn).install();
    Raven.captureException(msg);
  },
};

function log(msg:any, level:any) {
  try {
    const channels = sails.config.logger.logLevelConfig[level].channels;
    let message = '';
    const timestamp = sails.config.globals.moment().format('DD-MM-YYYY HH:mm');
    if (typeof msg === 'string') { message = `${timestamp} | ${level} | ${msg}`; } else { message = `${timestamp} | ${level} | ${util.inspect(msg)}`; }
    channels.forEach((channel) => {
      if (channel === 'console') {
        channelDefinition.console(message, level);
      } else {
        const channelConfig = sails.config.logger.channels[channel];
        channelDefinition[channelConfig.type](message, channel, channelConfig, level);
      }
    });
  } catch (err) {
    sails.log.error(err);
  }
}
module.exports = {

  log(msg:any) {
    log(msg, 'verbose');
  },
  verbose(msg:any) {
    log(msg, 'verbose');
  },
  debug(msg:any) {
    log(msg, 'debug');
  },
  info(msg:any) {
    log(msg, 'info');
  },
  warn(msg:any) {
    log(msg, 'warn');
  },
  error(error:any, errMsg:any) {
    try {
      let msg: string;
      if (error instanceof Error) {
        msg = errMsg ? `${errMsg}\n${error.stack}` : error.stack;
      } else if (errMsg) { msg = `${error} ${errMsg}`; } else { msg = error; }
      log(msg, 'error');
    } catch (err) {
      sails.log.error(err);
    }
  },

  setup() {
    const loggerConfig = sails.config.logger;

    const levels = sails.config.logger.logLevelConfig;

    assert.ok(loggerConfig, 'Logger not configured.');

    Object.keys(logLevels).forEach((level) => {
      assert.ok((levels[level] && Array.isArray(levels[level].channels)), `Log Level ${level} not configured.`);

      levels[level].channels.forEach((channel) => {
        Object.keys(logLevels).forEach((level1) => {
          if (logLevels[level1] > logLevels[level]) {
            assert.ok(levels[level1].channels.indexOf(channel) > -1, `Channel ${channel} configured for lower log level ${level} but not for higher log level ${level1}`);
          }
        });

        if (channel === 'console') { return; }

        assert.ok(loggerConfig.channels, 'No Log Channels configured.');

        assert.ok(loggerConfig.channels[channel], `Log Channel ${channel} not configured.`);

        assert.ok(loggerConfig.channels[channel].type, `No channel type specified for ${channel}`);

        assert.ok(channelConfigValidation[loggerConfig.channels[channel].type], `No validation method specified in channelConfigValidation for ${loggerConfig.channels[channel].type} channel.`);

        channelConfigValidation[loggerConfig.channels[channel].type](loggerConfig, channel);
      });
    });
  },
};
