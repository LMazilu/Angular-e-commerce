import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }

}
