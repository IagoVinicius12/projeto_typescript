import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CursoAluno{
    @Column()
    curso_id:Number=0;

    @Column()
    aluno_id:Number=0;
}