import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude as ExcludeTransform } from 'class-transformer';

@Entity('ft_exercise')
export class Exercise {
  @PrimaryColumn({
    name: 'key',
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

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ExcludeTransform()
  createdAt: Date;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 10,
  })
  @ExcludeTransform()
  createdBy: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ExcludeTransform()
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 10,
  })
  @ExcludeTransform()
  updatedBy: string;
}
