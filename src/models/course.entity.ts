import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { User } from "./user.entity.js";
import { Enrollment } from "./enrollment.entity.js";

@Entity({ name: "courses" })
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    title: string;

    @Column({type: "varchar", unique: true})
    code!: string;

    @Column({type: "int"})
    capacity!: number;

    @ManyToOne(() => User, (user) => user.courses)
    createdBy!: User;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments!: Enrollment[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}