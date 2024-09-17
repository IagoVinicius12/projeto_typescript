import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome: string='';

  @Column()
  email:string='';

  @Column()
  cpf:string='';

  @Column()
  endereco:string='';

  @Column()
  numero:string='';

  @Column()
  complemento:string='';

  @Column()
  cidade:string='';

  @Column()
  estado:string='';  
}
