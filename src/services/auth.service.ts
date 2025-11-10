import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtConfig } from "../config/config.js";
import type { AuthResponseDTO, TokenPayload } from "../dtos/auth.dto.js";
import { AppError } from "../errors/Errors.js";


export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (err) {
            throw new AppError("Failed to hash password", 500);
        }
    };


    static async validatePassword(password:string, hashed_password:string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashed_password)
        } catch (err) {
            throw new AppError("Failed to validate password", 500);
        }
    };

    static generateTokens(payload: Omit<TokenPayload, "iat" |"exp">): AuthResponseDTO  {
        try {
            const accessToken: string = jwt.sign(payload, jwtConfig.accessSecret, {
                expiresIn: jwtConfig.accessExpire});
            const refreshToken: string = jwt.sign(payload, jwtConfig.refreshSecret, {
                expiresIn: jwtConfig.refreshExpire});
                
            return { accessToken, refreshToken };
        } catch (err) {
            throw new AppError("Failed to generate tokens", 500);
        }
    }


    static verifyAccess(token: string): TokenPayload {
        try {
            const payload = jwt.verify(token, jwtConfig.accessSecret) as unknown;
            return payload as TokenPayload;
        } catch (err) {
            throw new AppError("Invalid or expired access token", 401);
        }
    }

    static verifyRefresh(token: string): TokenPayload{
        try {
            const payload = jwt.verify(token, jwtConfig.refreshSecret) as unknown;
            return payload as TokenPayload
        } catch (err) {
            throw new AppError("Invalid or expired refresh token", 401);
        }
    }
}

