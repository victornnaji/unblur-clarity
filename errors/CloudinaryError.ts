import { CustomError } from "./CustomError";

export class CloudinaryError extends CustomError {
    context: any;
  
    constructor(message: string, options?: { cause?: Error; context?: any }) {
      super(message, 500, options);
      this.name = 'CloudinaryError';
      this.context = options?.context;
  }
}
