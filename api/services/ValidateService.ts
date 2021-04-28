const FileType = require('file-type');
const readChunk = require('read-chunk');
declare var sails: any;
declare var Logger: any;
declare var CustomValidator: any;

module.exports = {

  validate(args, callback) {
    Logger.debug('ValidateService.validate');
    //Logger.verbose(`args.length :${args.length}`);

    const validationErrMsg = [];

    const rules = {
      isPasswordStrong(name, value, rule) {
        Logger.verbose('isPasswordStrong');

        const message = CustomValidator.validatePassword(value);
        if (message) {
          rule.message = rule.message !== undefined ? rule.message : message;
          throw new Error(rule.message);
        }
      },

      checkBurnerEmailAddress(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        const tempEmail = sails.config.emailAddressDomain.tempEmail;
        if (tempEmail.indexOf(value) > -1) {
          throw new Error(rule.message);
        }
      },

      notEmpty(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name}`;
        Logger.warn(name);
        if (typeof value === 'string') {
          const val = value.trim();
          sails.config.globals.assert.ok(val, rule.message);
        } else {
          sails.config.globals.assert.ok(value !== undefined, rule.message);
        }
      },
      isTruthy(name, value, rule) { //Not null, NAN, blank etc
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name}`;
        Logger.warn(name);
        if (typeof value === 'string') {
          const val = value.trim();
          sails.config.globals.assert.ok(val, rule.message);
        } else {
          sails.config.globals.assert.ok(value, rule.message);
        }
      },
      integer(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a number`;
        sails.config.globals.assert.equal(typeof (value), 'number', rule.message);
      },
      string(name, value, rule) {
        Logger.verbose('string');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string`;
        sails.config.globals.assert.equal(typeof (value), 'string', rule.message);
      },
      stringLength(name, value, rule) {
        Logger.verbose('stringLength');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string of ${rule.minLength} - ${rule.maxLength}`;
        if (typeof value !== 'string' || !(value.length <= rule.maxLength) || !(value.length >= rule.minLength)) {
          throw new Error(rule.message);
        }
      },
      range(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name} between ${rule.min} to ${rule.max}`;

        if (rule.min > value || rule.max < value) {
          throw new Error(rule.message);
        }
      },
      email(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      regex(name, value, rule) {
        Logger.verbose('regex');
        Logger.verbose(value);
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        const re = rule.regex;
        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      ISODate(name, value, rule) {
        Logger.verbose('ISODate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !sails.config.globals.moment(value, sails.config.globals.moment.ISO_8601, true).isValid()) {
          throw new Error(rule.message);
        }
      },
      isDateFormat(name, value, rule) {
        Logger.verbose('ISODate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !sails.config.globals.moment(value, rule.format, true).isValid()) {
          throw new Error(rule.message);
        }
      },
      compareDates(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !sails.config.globals.moment(value, rule.format, true).isValid()) {
          throw new Error('Invalid date format');
        } else if (value && (!rule.value || !sails.config.globals.moment(value, rule.format, true).isValid())) {
          throw new Error('Invalid compare date format');
        } else if (rule.compare === 'gt') {
          if (value && (sails.config.globals.moment(value, rule.format).toDate() <= sails.config.globals.moment(rule.value, rule.format).toDate())) {
            throw new Error(rule.message);
          }
        }
      },
      isEqual(name, value, rule) {
        Logger.verbose('isEqual');
        rule.message = rule.message !== undefined ? rule.message : `${name} should be equal to ${rule.name}`;
        if (value && value !== rule.value) { throw new Error(rule.message); }
      },
      contentInList(name, value, rule) {
        Logger.verbose('contentInList');
        rule.message = rule.message !== undefined ? rule.message : `Please select from ${name}`;
        if (value) {
          if (rule.list.indexOf(value) === -1) {
            throw new Error(rule.message);
          }
        }
      },
      isNonEmptyArray(name, value, rule) {
        Logger.verbose('isNonEmptyArray');
        rule.message = rule.message !== undefined ? rule.message : `${name} cannot be empty.`;
        if (value) {
          Logger.warn(value);
          Logger.warn(value.length);
          Logger.warn(Array.isArray(value));
          if (!Array.isArray(value) || !value.length) {
            Logger.warn('In warn isNonEmptyArray');
            throw new Error(rule.message);
          }
        }
      },
      isArray(name, value, rule) {
        Logger.verbose('isNonEmptyArray');
        rule.message = rule.message !== undefined ? rule.message : `${name} is not an Array.`;
        if (value) {
          if (!Array.isArray(value)) {
            throw new Error(rule.message);
          }
        }
      },
      stdDate(name, value, rule) {
        Logger.verbose('stdDate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (!sails.config.globals.moment(value, 'DD-MM-YYYY').isValid()) {
          throw new Error(rule.message);
        }
      },
      URL(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid url ${name}`;
        const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
        Logger.warn(value);
        Logger.warn(re.test(value));
        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      async checkFileType(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name} file type`;
        (async () => {
          Logger.verbose(rule.values);
          const buffer = readChunk.sync(value, 0, 4100);
          const fileData = await FileType.fromBuffer(buffer);
          Logger.verbose(`file mime : ${fileData.mime}`);
          if (!rule.values.includes(fileData.mime)) { throw new Error(rule.message); }
        })();
      },

      checkFileSize(name, value, rule) {
        Logger.verbose('checkFileSize');
        rule.message = rule.message !== undefined ? rule.message : `Please upload proper size of ${name}`;
        if (value && value > rule.value) { throw new Error(rule.message); }
      },
    };

    for (let i = 0; i < args.length; i += 1) {
      Logger.verbose(`Name : ${args[i].name}`);
      for (let j = 0; j < args[i].validations.length; j + 1) {
        try {
          rules[args[i].validations[j].validation](args[i].name, args[i].value, args[i].validations[j]);
        } catch (e) {
          let tempJson = {};
          if (args[i].status === undefined) {
            tempJson = { name: args[i].name, value: args[i].value, validations: [args[i].validations[j]] };
          } else {
            tempJson = {
              status: args[i].status, name: args[i].name, value: args[i].value, validations: [args[i].validations[j]],
            };
          }
          validationErrMsg.push(tempJson);
          break;
        }
      }
    }
    Logger.verbose(JSON.stringify(validationErrMsg));
    return callback(null, validationErrMsg);
  },
  getValidateMsg(arr, callback) {
    Logger.debug('ValidateService.getValidateMsg');
    try {
      const errMsg = [];
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].validations.length; j += 1) {
          errMsg.push(arr[i].validations[j].message);
        }
      }
      return callback(null, errMsg);
    } catch (e) {
      return callback(e);
    }
  },
};
