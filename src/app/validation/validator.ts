import { AbstractControl } from '@angular/forms'
import { ErrorMessages } from 'src/app/constants/Messages'
import * as moment from 'moment';
export class customValidators {

  static isNotEmpty() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const val: string = control.value;
      if (val == null || val.length === 0) {
        return {
          'isNotEmpty': true
        };
      }
      return null;
    };
  }
  static hasMinLength(Min: Number) {
    return (control: AbstractControl) => {
      const val: string = control.value;
      if (val !== null || val !== undefined) {
        if (val.length <= Min) {
          return { 'hasMinLength': true }
        }
      }
      return null;
    };
  }
  static maxLength(Max: Number) {
    return (control: AbstractControl) => {
      const val: string = control.value;
      if (val !== null || val !== undefined) {
        if (val.length >= Max) {
          return { 'hasError': true }
        }
      }
      return null;
    };
  }
  static isEmail() {
    return (control: AbstractControl) => {
      const val: string = control.value;
      if (val !== null || val !== undefined) {
        console.log("inside",val)
        const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!re.test(val)) {
          return { 'hasError': true }
        }
      }
      return null;
    };
  }
  static isTruthy() {
    return (control: AbstractControl) => {
      const val: string = control.value;
      if (val !== null || val !== undefined) {
        if (typeof val !== 'string') {
          return { 'hasError': true }
        }
      }
      return null;
    };
  }
  static integer() {
    return (control: AbstractControl) => {
      const val: string = control.value;
      if (val !== null || val !== undefined) {
        if (typeof val !== 'number') {
          return { 'isError': true }
        }
      }
      return null;
    };
  }
  static stringLength(maxLength: number, minLength: number) {
    return (control: AbstractControl) => {
      const val: string = control.value;
      if (val !== null || val !== undefined) {
        if (typeof val !== 'string' || !(val.length <= maxLength) || !(val.length >= minLength)) {
          return { 'hasError': true }
        }
      }
      return null;
    };
  }
  static range(max: number, min: number) {
    return (control: AbstractControl) => {
      const val: number = control.value;
      if (val !== null || val !== undefined) {
        if (min > val || max < val) {
          return { 'hasError': true }
        }
      }
      return null;
    };
  }
  static ISODate(name: String, value: any, rule: any) {
    
    rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
    if (value && !moment(value, moment.ISO_8601, true).isValid()) {
      throw new Error(rule.message);
    }
  }
  static isDateFormat(name, value, rule) {
   
    rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
    if (value && !moment(value, rule.format, true).isValid()) {
      throw new Error(rule.message);
    }
  }
  static compareDates(name, value, rule) {
    rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
    if (value && !moment(value, rule.format, true).isValid()) {

    }
    if (value && (!rule.value || !moment(value, rule.format, true).isValid())) {

    }
    if (rule.compare === 'gt') {
      if (value && (moment(value, rule.format).toDate() <= moment(rule.value, rule.format).toDate())) {
        throw new Error(rule.message);
      }
    }
  }
  static isEqual(name, value, rule) {
   
    rule.message = rule.message !== undefined ? rule.message : `${name} should be equal to ${rule.name}`;
    if (value && value !== rule.value) { throw new Error(rule.message); }
  }
  
  static contentInList(name, value, rule) {
  
    rule.message = rule.message !== undefined ? rule.message : `Please select from ${name}`;
    if (value) {
      if (rule.list.indexOf(value) === -1) {
        throw new Error(rule.message);
      }
    }
  }
  static isNonEmptyArray(name, value, rule) {
   
    rule.message = rule.message !== undefined ? rule.message : `${name} cannot be empty.`;
    if (value) {
      if (!Array.isArray(value) || !value.length) {
        throw new Error(rule.message);
      }
    }
  }
  static isArray(name, value, rule) {
   
    rule.message = rule.message !== undefined ? rule.message : `${name} is not an Array.`;
    if (value) {
      if (!Array.isArray(value)) {
        throw new Error(rule.message);
      }
    }
  }
  static stdDate(name, value, rule) {
  
    rule.message = rule.message !== undefined ? rule.message : `Please enter valid ${name}`;
    if (!moment(value, 'DD-MM-YYYY').isValid()) {
      throw new Error(rule.message);
    }
  }
}






