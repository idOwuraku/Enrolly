import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Student } from "./student.entity.js";
import { Enrollment } from "./enrollment.entity.js";
import { PaymentStatus } from "./payment-status.enum.js";

@Entity({ name: "payments"})
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, (student) => student.payments)
    student!: Student;

    @ManyToOne(() => Enrollment, (enrollment) => enrollment.payments, {nullable: true})
    enrollment?: Enrollment;

    @Column({ type: "decimal", precision: 10, scale:2})
    amount!: number;

    @Column( {type: "varchar", default: "GHS"})
    currency!: string

    @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING})
    status: PaymentStatus

    @Column( {type: "varchar", nullable: true})
    reference?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}