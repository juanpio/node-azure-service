import { ValidationError } from 'class-validator';

export class ValidationErrorParser {
  public static getValidationErrors(valErrors: ValidationError[]): string {
    let errString = '';

    valErrors.forEach((error) => {
      // sanitize 'patientName' if it exists
      if (
        error.value != null &&
        typeof error.value === 'object' &&
        'patientName' in error.value
      ) {
        error.value.patientName = '*****';
      }

      // create messages
      if (error.constraints != null) {
        const errorMessages = Object.values(error.constraints).join('; ');
        errString += `${error.property}: ${errorMessages}; `;
      }

      // recursion
      if (error.children != null && error.children.length > 0) {
        errString += this.getValidationErrors(error.children);
      }
    });

    errString = errString.replaceAll(';', '; ');

    return errString.trim();
  }
}
