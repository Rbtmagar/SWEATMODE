import 'express';


declare module 'express-serve-static-core' {
  interface Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
    user?: {
      email: string;
      role: string;
      iat: number;
      exp: number;
    };
  }
}
