import {Entity, PrimaryGeneratedColumn,Column} from 'typeorm'

@Entity()
export class Curso{
    @PrimaryGeneratedColumn()
    id!:Number;

    @Column()
    nome:string='';

    @Column()
    id_professor:Number=0;
}