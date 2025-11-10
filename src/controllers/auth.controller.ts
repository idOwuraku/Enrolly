import type { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../models/user.entity.js";
import { AppError } from "../errors/Errors.js";
import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";


const userRepo: Repository<User> = AppDataSource.getRepository(User)

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                throw new AppError("Username, email and password are required", 400);
            }

            const existing = await userRepo.findOneBy({ email });
            if (existing) throw new AppError("User with this email already exists", 409);

            const hashed_password = await AuthService.hashPassword(password);
            const user = userRepo.create({username, email, hashed_password});
            await userRepo.save(user);

            const tokens = AuthService.generateTokens({ sub: user.id, role: user.role});
            
            res.status(201).json({user, ...tokens});
        } catch (err) {
            next(err);
        }        
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const { username, password } = req.body;

            if (!username || !password) throw new AppError ("Username and password are required");

            const user = await userRepo.findOneBy({ username });
            if (!user) throw new AppError("Invalid credentials", 401);

            const isValid = await AuthService.validatePassword(password, user.hashed_password)
            if (!isValid) throw new AppError("Invalid credentials", 401);

            const tokens = AuthService.generateTokens( {sub: user.id, role: user.role});
            res.json({user, ...tokens});
        } catch (err) {
            next(err)
        }
    }

    static async refresh(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw new AppError("Missing refresh token", 401);

            const decoded = AuthService.verifyRefresh(refreshToken);
            const tokens = AuthService.generateTokens({
                sub: decoded.sub as number, 
                role: decoded.role as string,
            });

            res.json(tokens);
        } catch (err) {
            next(err);
        }
    }
}