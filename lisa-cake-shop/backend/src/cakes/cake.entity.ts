import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cakes')
export class Cake {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120, unique: true })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'double precision' })
  price!: number;

  @Column({ length: 16 })
  image!: string;
}
