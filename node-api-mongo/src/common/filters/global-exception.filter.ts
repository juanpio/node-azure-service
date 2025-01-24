// import {
//   Injectable,
//   Catch,
//   HttpException,
//   ExceptionFilter,
//   ArgumentsHost,
//   HttpStatus,
// } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
// import {
//   IepExceptionHelper,
//   IepLoggerService,
//   Rfc9457Data,
//   UnexpectedException,
// } from 'iep-libs-common';

// @Injectable()
// @Catch()
// export class GlobalExceptionsFilter implements ExceptionFilter {
//   constructor(
//     private readonly logger: IepLoggerService,
//     private readonly httpAdapterHost: HttpAdapterHost,
//   ) {}
//   catch(exception: unknown, host: ArgumentsHost): void {
//     // In certain situations `httpAdapter` might not be available in the
//     // constructor method, thus we should resolve it here.
//     const { httpAdapter } = this.httpAdapterHost;

//     const ctx = host.switchToHttp();

//     // get the request and response objects
//     const request = ctx.getRequest();
//     const response = ctx.getResponse();

//     // TODO: add logging, custom handling (Rfc errors vs unknown errors vs Http errors)
//     const iepException = IepExceptionHelper.convertToIepException(
//       IepExceptionHelper.createContext(GlobalExceptionsFilter.name, 'catch'),
//       exception,
//       UnexpectedException,
//       {
//         traceId: '*** to be implemented ***',
//         title: 'Unexpected error',
//       } as Rfc9457Data,
//     );
//     this.logger.error(iepException);

//     const httpStatus =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;

//     // check to see if were are still in a HTTP context.
//     // If not, then we are catching an error thrown from background processing, so don't send anything.
//     if (request && response) {
//       const responseBody = {
//         statusCode: httpStatus,
//         timestamp: new Date().toISOString(),
//         path: httpAdapter.getRequestUrl(request),
//       };

//       httpAdapter.setHeader(
//         response,
//         'Content-Type',
//         'application/problem+json',
//       );
//       httpAdapter.reply(response, responseBody, httpStatus);
//     }
//   }
// }
