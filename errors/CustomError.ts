export class CustomError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number,
    options?: { cause?: Error | string; context?: any }
  ) {
    super(message, options);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
