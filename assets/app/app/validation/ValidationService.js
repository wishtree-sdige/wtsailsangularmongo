/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/**
 * ValidateService.js
 * @help        :: See http://sailsjs.com/documentation/anatomy/my-app/api/services
 */
const assert = require('assert');
const moment = require('moment');

module.exports = {

  validate(args, callback) {
    // //Logger.verbose(`args.length :${args.length}`);
    const validationErrMsg = [];
    console.log("args"+args)
    const rules = {
      notEmpty(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name}`;
        // //Logger.warn(name);
        if (typeof value === 'string') {
          value = value.trim();
          assert.ok(value, rule.message);
        } else {
          assert.ok(value !== undefined, rule.message);
        }
      },
      isTruthy(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter ${name}`;
        // Logger.warn(name);
        if (typeof value === 'string') {
          value = value.trim();
          assert.ok(value, rule.message);
        } else {
          assert.ok(value, rule.message);
        }
      },
      boolean(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a boolean`;
        assert.equal(typeof (value), 'boolean', rule.message);
      },
      integer(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a number`;
        assert.equal(typeof (value), 'number', rule.message);
      },
      string(name, value, rule) {
        // Logger.verbose('string');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string`;
        assert.equal(typeof (value), 'string', rule.message);
      },
      maxLength(name, value, rule) {
        // Logger.verbose('maxLength');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string of ${rule.maxLength}`;
        if (typeof value !== 'string' || !(value.length <= rule.maxLength)) {
          throw new Error(rule.message);
        }
      },
      minLength(name, value, rule) {
        // Logger.verbose('minLength');
        rule.message = rule.message !== undefined ? rule.message : `${name} must be a string of ${rule.minLength}`;
        if (typeof value !== 'string' || !(value.length >= rule.minLength)) {
          throw new Error(rule.message);
        }
      },
      stringLength(name, value, rule) {
        // Logger.verbose('stringLength');
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
        // Logger.verbose('regex');
        // Logger.verbose(value);
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        const re = rule.regex;
        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
      ISODate(name, value, rule) {
        // Logger.verbose('ISODate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !moment(value, moment.ISO_8601, true).isValid()) {
          throw new Error(rule.message);
        }
      },
      isDateFormat(name, value, rule) {
        // Logger.verbose('ISODate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !moment(value, rule.format, true).isValid()) {
          throw new Error(rule.message);
        }
      },
      compareDates(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (value && !moment(value, rule.format, true).isValid()) {
          return callback(new Error('Invalid date format'));
        }
        if (value && (!rule.value || !moment(value, rule.format, true).isValid())) {
          return callback(new Error('Invalid compare date format'));
        }
        if (rule.compare === 'gt') {
          if (value && (moment(value, rule.format).toDate() <= moment(rule.value, rule.format).toDate())) {
            throw new Error(rule.message);
          }
        }
      },
      isEqual(name, value, rule) {
        // Logger.verbose('isEqual');
        rule.message = rule.message !== undefined ? rule.message : `${name} should be equal to ${rule.name}`;
        if (value && value !== rule.value) { throw new Error(rule.message); }
      },
      contentInList(name, value, rule) {
        // Logger.verbose('contentInList');
        rule.message = rule.message !== undefined ? rule.message : `Please select from ${name}`;
        if (value) {
          if (rule.list.indexOf(value) === -1) {
            throw new Error(rule.message);
          }
        }
      },
      isNonEmptyArray(name, value, rule) {
        // Logger.verbose('isNonEmptyArray');
        rule.message = rule.message !== undefined ? rule.message : `${name} cannot be empty.`;
        if (value) {
          if (!Array.isArray(value) || !value.length) {
            throw new Error(rule.message);
          }
        }
      },
      isArray(name, value, rule) {
        // Logger.verbose('isNonEmptyArray');
        rule.message = rule.message !== undefined ? rule.message : `${name} is not an Array.`;
        if (value) {
          if (!Array.isArray(value)) {
            throw new Error(rule.message);
          }
        }
      },
      stdDate(name, value, rule) {
        // Logger.verbose('stdDate');
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
        if (!moment(value, 'DD-MM-YYYY').isValid()) {
          throw new Error(rule.message);
        }
      },
      fileExtension(name, value, rule) {
        const filenames = value;
        let fileExtensions;
        if (Array.isArray(rule.value)) {
          fileExtensions = rule.value.join('|');
        } else {
          fileExtensions = rule.value;
        }
        const fileRegex = new RegExp(`(?:${fileExtensions})$`);

        if (Array.isArray(filenames)) {
          for (let i = 0; i < filenames.length; i += 1) {
            const filename = filenames[i];
            const fileExtention = (filename.split('.')[filename.split('.').length - 1] !== undefined) ? filename.split('.')[filename.split('.').length - 1].toLowerCase() : '';
            if (!fileExtention.match(fileRegex)) {
              throw new Error(rule.message);
            }
          }
        } else {
          const filename = filenames;
          const fileExtention = (filename.split('.')[filename.split('.').length - 1] !== undefined) ? filename.split('.')[filename.split('.').length - 1].toLowerCase() : '';
          if (!fileExtention.match(fileRegex)) {
            throw new Error(rule.message);
          }
        }
      },
      URL(name, value, rule) {
        rule.message = rule.message !== undefined ? rule.message : `Please enter valid url ${name}`;
        const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
        // Logger.warn(value);
        // Logger.warn(re.test(value));
        if (value && !re.test(value)) {
          throw new Error(rule.message);
        }
      },
    };

    for (let i = 0; i < args.length; i += 1) {
      for (let j = 0; j < args[i].validations.length; j += 1) {
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
    // if (i === args.length) {
    // Logger.verbose(JSON.stringify(validationErrMsg));
    return callback(null, validationErrMsg);
    // }
  },
  getValidateMsg(arr, callback) {
    // Logger.debug('ValidateService.getValidateMsg');
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
