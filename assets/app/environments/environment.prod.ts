import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  production: true,
  environmentName: 'Production',
  apiUrl: 'production url',
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
