import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default class DefaultEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Column("varchar", { length: 50 })
    createdBy: string;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column("varchar", { length: 50 })
    updatedBy: string;

    @Column("int", { default: 1 })
    active: number;

}