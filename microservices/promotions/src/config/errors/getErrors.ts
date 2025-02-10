import {
  ControlledError,
  InvalidEntityError,
  NotFoundError,
  ServerError,
} from './Errors'

export const validateError = (error: any) => {
  let status = 500
  let message = 'Internal Server Error'
  switch (error.constructor) {
    case ControlledError:
    case InvalidEntityError:
    case NotFoundError:
    case ServerError:
      status = error.status || error.code || status
      message = error.message
  }

  if (error.code === 'ECONNREFUSED') {
    console.error('Database connection was refused:', error)
    status = 503
    message = 'Service unavailable. Please try again later.'
  } else if (error.code === 'ETIMEDOUT') {
    console.error('Database connection timed out:', error)
    status = 504
    message = 'Request timed out. Please try again later.'
  }

  return { status, message }
}
