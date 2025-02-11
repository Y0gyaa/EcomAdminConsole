import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Backend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ type: "jsonb", nullable: true })
  images: string[];
}
