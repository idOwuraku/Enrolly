import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/Errors.js";
import { AuthService } from "../services/auth.service.js";

export const  requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if ( !authHeader?.startsWith("Bearer ")) {
        throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) throw new AppError("Token missing from Authorization Header", 401);
    try {
        const payload = AuthService.verifyAccess(token);
        (req as any).user = payload;
        next();
    } catch {
        throw new AppError("Invalid or expired token", 401);
    }
};