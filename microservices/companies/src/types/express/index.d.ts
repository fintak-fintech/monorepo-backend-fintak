import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // Add the user field to the Request object
  }
}
