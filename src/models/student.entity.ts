import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { User } from "./user.entity.js";
import { Payment } from "./payment.entity.js";
import { Enrollment } from "./enrollment.entity.js";


@Entity({ name: "students" })
export class Student {
    @PrimaryGeneratedColumn()
    id! : number;

    @Column({ type: "varchar" })
    firstName!: string;

    @Column({ type: "varchar" })
    lastName!: string;

    @Column({ type: "varchar" })
    hashed_password!: string;

    @ManyToOne(() => User, (user) => user.students)
    createdBy!: User;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments!: Enrollment[];

    @OneToMany(() => Payment, (payment) => payment.student)
    payments!: Payment[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}