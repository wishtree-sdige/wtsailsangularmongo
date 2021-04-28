import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';
export class customValidators {
  static isNotEmpty() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value == null || value.length === 0) {
        return {
          'isNotEmpty': true
        };
      }
      return null;
    };
  }
  static hasMinLength(Min: Number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value !== null || value !== undefined) {
        if (value.length <= Min) {
          return { 'hasMinLength': true }
        }
      }
      return null;
    };
  }
  static hasMaxLength(Max: Number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value !== null || value !== undefined) {
        if (value.length >= Max) {
          return { 'hasMaxLength': true }
        }
      }
      return null;
    };
  }
  static isEmail() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value !== null || value !== undefined) {
        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(value)) {
          return { 'isEmail': true }
        }
      }
      return null;
    };
  }
  static isTruthy() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const val: string = control.value;
      if (val !== null || val !== undefined ||isNaN(Number(val))) {
        if (typeof val !== 'string') {
          return { 'isTruthy': true }
        }
      }
      return null;
    };
  }
  static isInteger() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var numbers = new RegExp(/^[0-9]+$/);
      const value = control.value;
      if (value !== null || value !== undefined) {
        if (numbers.test(value)) {
          return { 'isInteger': true }
        }
      }
      return null;
    };
  }
  static stringLength(maxLength: number, minLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value !== null || value !== undefined) {
        if (typeof value !== 'string' || !(value.length <= maxLength) || !(value.length >= minLength)) {
          return { 'stringLength': true }
        }
      }
      return null;
    };
  }
  static range(max: number, min: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const val: number = control.value;
      if (val !== null || val !== undefined) {
        if (min > val || max < val) {
          return { 'range': true }
        }
      }
      return null;
    };
  }
  static ISODate() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: number = control.value;
      if (value !== null || value !== undefined) {
        if (value && !moment(value, moment.ISO_8601, true).isValid()) {
          return { 'ISODate': true }
        }
      }
      return null;
    };

  }
  static isDateFormat(format: any) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null || value !== undefined) {
        if (value && !moment(value, format, true).isValid()) {
          return { 'isDateFormat': true }
        }
      }

      return null;
    };


  }
  static compareDates(format: any) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null || value !== undefined) {
        if (value && !moment(value, format, true).isValid()) {
          return { 'compareDates': true }
        }
        if (value && (!value || !moment(value, format, true).isValid())) {
          return { 'compareDates': true }
        }
      }

      return null;
    };

  }
  static isEqual(equalValue) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null || value !== undefined) {
        if (value && value !== equalValue) { 
          return { 'isEqual': true }
        }
      }
      return null;
    };  
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
  static stdDate() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== null || value !== undefined) {
        if (!moment(value, 'DD-MM-YYYY').isValid()) {
          return { 'stdDate': true }
        }
      }
      return null;
    }; 
    
  }
}





