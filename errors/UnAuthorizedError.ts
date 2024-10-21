import { CustomError } from "./CustomError";

export class UnAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnAuthorizedError";
  }
}
