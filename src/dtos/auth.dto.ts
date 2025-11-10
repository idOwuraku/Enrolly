import type { JwtPayload } from "jsonwebtoken";

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    username: string;
    password: string;
}

export interface RefreshDTO {
    refreshToken: string;
}

export interface TokenPayload extends Omit <JwtPayload, 'sub'> {
    sub: number;
    role: string;
}

export interface AuthResponseDTO {
    accessToken: string;
    refreshToken: string;
}