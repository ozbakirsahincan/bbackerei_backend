import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {ProductCategory} from "../enums/ProductCategory";
// Ürün kategorileri için enum tanımı

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column({
        type: "enum",
        enum: ProductCategory,
        default: ProductCategory.BREAD
    })
    category: ProductCategory;

    @Column({ default: true })
    isAvailable: boolean;

    @Column({ nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
