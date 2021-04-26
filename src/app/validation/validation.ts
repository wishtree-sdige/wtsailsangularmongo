
/**{
    properties: [
    {
      fieldName: 'username',
      rules: [{
        type: 'required',
        required: {
          errorMessage: 'Required'
        }
      },
      {
        type: 'notEmpty',
        notEmpty: {
          errorMessage: ErrorMessages.usernameEmpty,
        }
      },
      {
        type: 'email',
        notEmpty: {
          errorMessage: ErrorMessages.email,
        }
      },
      {
        type: 'minLength',
        minLength: {
          maxLength: 2,
          errorMessage: ErrorMessages.minLength,
        }
        
      },
      {
        type: 'maxLength',
        minLength: {
          maxLength: 20,
          errorMessage: ErrorMessages.maxLength,
        }
        }]
    }, 
    {
      fieldName: 'password',
      rules: [{
        type: 'numericRangeValidator',
          numericRangeValidator: {
            minValue: 0,
            maxValue: 100,
            inclusive: true,
            errorMessage: 'Value must be between 0 and 100'
          }
        }]
      }
    ]
  }**/
  import { ErrorMessages } from 'src/app/constants/Messages';
  
export class validation{ 
  loginFormValidations=
  {
    'username':{
      'isNotEmpty':ErrorMessages.usernameEmpty,
      'hasMinLength':ErrorMessages.minLength,
    },
    'password':{
      'required':ErrorMessages.passwordEmpty,
      'maxlength':ErrorMessages.maxLength,
    },
  }
}