import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Not authorized. Token missing." });
        return
    }
    const token = authHeader.split(" ")[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        // Attach userId to req for use in controllers
        (req as any).userId = token_decode.id;
        next();
    } catch (error: any) {
        res.status(401).json({ success: false, message: error.message || "Invalid token" });
        return
    }
};

export default authUser;
