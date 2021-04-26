import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  production: false,
  environmentName: 'Staging',
  apiUrl: 'staging url',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
