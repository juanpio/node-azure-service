import { HttpStatus } from '@nestjs/common';
import { IepBaseException, Rfc9457Data } from 'iep-libs-common';

export class InputValidationException extends IepBaseException {
  constructor(errData?: Rfc9457Data, httpStatusCode?: number, cause?: unknown) {
    super(
      {
        title: errData?.title ?? 'Bad input',
        type: errData?.type,
        status: errData?.status,
        detail: errData?.detail,
        instance: errData?.instance,
        context: errData?.context,
        extra: errData?.extra,
      } as Rfc9457Data,
      httpStatusCode ?? HttpStatus.BAD_REQUEST,
      { cause: cause },
    );
  }
}
