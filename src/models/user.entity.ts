import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { UserRole } from "./user-role.enum.js";
import { Student } from "./student.entity.js";
import { Course } from "./course.entity.js";


@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar",unique: true })
    username!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar"})
    hashed_password!: string;

    @Column( {type: "enum", enum: UserRole, default: UserRole.USER})
    role!: UserRole;

    @OneToMany(() => Student, (student) => student.createdBy)
    students!: Student[];

    @OneToMany(() => Course, (course) => course.createdBy)
    courses!: Course[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;


}