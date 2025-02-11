import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const err = error.rejection || error;
    let message = '';

    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 0:
          message = 'Connection error';
          break;
        case HttpStatusCode.InternalServerError:
          message = 'Internal server error';
          break;
        case HttpStatusCode.BadRequest:
          message = error.error.message;
          break;
        case HttpStatusCode.NotFound:
          message = 'Not found';
          break;
        default:
          message = 'An error occurred';
      }
    } else {
      message = 'Errore applicativo';
    }

    console.error(error.message);
  }
}
