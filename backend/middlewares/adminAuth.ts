import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({
        success: false,
        message: "Not Authorized. Token missing or invalid format.",
      });
      return
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

    const decoded = jwt.verify(token, jwtSecret) as {
      email: string;
      role: string;
      iat: number;
      exp: number;
    };

    if (decoded.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Access denied. Not an admin.",
      });
      return
    }

    req.user = decoded; // Add user to request object
    next(); //Move to next middleware/controller
  } catch (error) {
    console.error("Auth Error:", error);
     res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default adminAuth;
