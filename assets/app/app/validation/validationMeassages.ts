import { ErrorMessages } from '../constants/Messages';


export class validationMeassages {
  loginFormValidations =
    {
      'username': {
        'isNotEmpty':ErrorMessages.usernameEmpty,
        'isEmail': ErrorMessages.email,
        'hasMinLength':ErrorMessages.minLength
      },
      'password': {
        'required': ErrorMessages.passwordEmpty,
        'maxlength': ErrorMessages.maxLength,
      },
    }
}