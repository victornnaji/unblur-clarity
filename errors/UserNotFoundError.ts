import { CustomError } from "./CustomError";

export class UserNotFoundError extends CustomError {
  constructor() {
    super('User Not Found', 404);
    this.name = "UserNotFoundError";
  }
}
