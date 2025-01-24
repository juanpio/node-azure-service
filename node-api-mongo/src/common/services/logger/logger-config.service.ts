// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import {
//   IepLoggerOptionsFactory,
//   IepLoggingOptions,
//   IepLogLevels,
//   toIepLogLevelFromString,
// } from 'iep-libs-common';
// import { ConfigSettings } from '../config';

// @Injectable()
// export class LoggerConfig implements IepLoggerOptionsFactory {
//   private readonly logLevel: IepLogLevels;

//   constructor(private readonly configService: ConfigService) {
//     this.logLevel = toIepLogLevelFromString(
//       this.configService.get(ConfigSettings.APP_LOGLEVEL, IepLogLevels.Trace)!,
//     );
//   }

//   public createIepLoggerOptions():
//     | Promise<IepLoggingOptions>
//     | IepLoggingOptions {
//     return {
//       logLevel: this.logLevel,
//       injectCustomPropsCallback: () => ({
//         appName: 'iep-ach-svc',
//         traceId: '*** to be implemented ***',
//       }),
//     };
//   }
// }
