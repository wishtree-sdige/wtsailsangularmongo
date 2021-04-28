declare var Logger: any;

module.exports = {

  validatePassword(password) {
    Logger.verbose('CipherUtilsService.validatePassword');

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const minLenght = 6;
    const maxLength = 20;
    if (password === undefined) {
      return 'Please enter password';
    }
    if (password === '') {
      return 'Please enter password';
    }
    if (password.length < minLenght) {
      return 'Password must be atleast 6 character long';
    }
    if (password.length > maxLength) {
      return 'Password must be less than 20 charecter';
    }

    for (let i = 0; i < password.length; i += 1) {
      if (chars.indexOf(password[i]) === -1) {
        return 'Password can only have number, alphabet & special chars(!@#$%^&*) ';
      }
    }
    return '';
  },
};
