class BaseError extends Error {
  constructor(message: string, public code: number) {
    super(message)
    this.code = code || 500
  }
}

export class ControlledError extends BaseError {
  constructor(message: string, public code = 400) {
    super(message, code)
    this.code = code
  }
}

export class ServerError extends BaseError {
  constructor(message: string, public code = 500) {
    super(message, code)
    this.code = code
  }
}

export class InvalidEntityError extends BaseError {
  constructor(message: string, public code = 422) {
    super(message, code)
    this.code = code
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, public code = 404) {
    super(message, code)
    this.code = code
  }
}

export class NotAuthorizedError extends BaseError {
  constructor(message: string, public code = 401) {
    super(message, code)
    this.code = code
  }
}
