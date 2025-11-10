import { UserRole } from "../models/user-role.enum.js";

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface UpdateUserDTO {
    username?: string;
    email?: string;
    password?: string;
    roles?: UserRole;
}

export interface UserResponseDTO {
    id: number;
    username: string;
    role: UserRole;
    createdAt: Date;
    updateAt: Date;
}