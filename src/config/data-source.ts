import { DataSource } from "typeorm";
import { User } from "../models/user.entity.js";
import { config } from "./config.js";
import { Student } from "../models/student.entity.js";
import { Course } from "../models/course.entity.js";
import { Enrollment } from "../models/enrollment.entity.js";
import { Payment } from "../models/payment.entity.js";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.name,
    synchronize: true,
    logging: true,
    entities: [User, Student, Course, Enrollment, Payment],
    migrations: ["src/migrations/.ts"],
    subscribers: [],
});

export const initDb = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
};