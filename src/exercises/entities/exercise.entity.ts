import { BaseModel } from 'src/common/base-model';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ft_exercise')
export class Exercise extends BaseModel {
  @PrimaryColumn({
    name: 'exercise_key',
    type: 'uuid',
  })
  key: string;

  @Column({
    name: 'exercise_name',
    type: 'varchar',
    length: 100,
  })
  exerciseName: string;

  @Column({
    name: 'duration',
    type: 'integer',
  })
  duration: number;
}
