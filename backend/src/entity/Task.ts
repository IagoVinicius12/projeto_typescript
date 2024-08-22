import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string='';

  @Column()
  checked:boolean=false;

  @Column()
  userid: string='';
}
