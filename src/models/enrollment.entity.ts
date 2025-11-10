import {
    CreateDateColumn,
    Entity,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./student.entity.js";
import { Course } from "./course.entity.js";
import { Payment } from "./payment.entity.js";

@Entity({ name: "enrollment" })
export class Enrollment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, (student) => student.enrollments)
    student!: Student;

    @ManyToOne(() => Course, (course) => course.enrollments)
    course!: Course;

    @OneToMany(() => Payment, (payment) => payment.enrollment)
    payments!: Payment[];

    @CreateDateColumn()
    createdAt: Date;

}