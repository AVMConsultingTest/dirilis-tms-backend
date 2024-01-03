export class HttpError extends Error {
  constructor(
        public readonly statusCode: number,
        message: string
  ) {
    super(message);
  }

  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }

  static badRequest(message: string) {
    return new HttpError(400, message);
  }
    
  static unauthorized(message?: string) {
    return new HttpError(401, message || "Unauthorized");
  }

  static forbidden(message?: string) {
    return new HttpError(403, message || "Forbidden");
  }

  static notFound(name: string) {
    return new HttpError(404, `${name} not found`);
  }
}