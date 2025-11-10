import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT,
    db: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    }
}

interface JwtConfig {
    accessSecret: string;
    accessExpire: number;
    refreshSecret: string;
    refreshExpire: number;
}

if (!process.env.ACCESS_TOKEN_SECRET || 
    !process.env.ACCESS_TOKEN_EXPIRES_IN ||
    !process.env.REFRESH_TOKEN_SECRET ||
    !process.env.REFRESH_TOKEN_EXPIRES_IN
) {
    throw new Error("JWT secrets are not defined. Please set ACCESS_TOKEN_SECRET and REFERESH_TOKEN_SECRET environment varialbles");
}

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN: number = Number(process.env.ACCESS_TOKEN_EXPIRES_IN)!;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRES_IN: number = Number(process.env.REFRESH_TOKEN_EXPIRES_IN)!;

export const jwtConfig: JwtConfig = {
    accessSecret: ACCESS_TOKEN_SECRET,
    accessExpire: ACCESS_TOKEN_EXPIRES_IN,
    refreshSecret: REFRESH_TOKEN_SECRET,
    refreshExpire: REFRESH_TOKEN_EXPIRES_IN,
}