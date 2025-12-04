import { BaseModel } from 'src/common/base-model';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ft_daily_weight')
export class DailyWeight extends BaseModel {
  @PrimaryColumn({
    name: 'weight_key',
    type: 'uuid',
  })
  key: string;

  @Column({
    name: 'user_key',
    type: 'uuid',
  })
  userKey: string;

  @Column({
    name: 'weighted_date',
  })
  weightedDate: Date;

  @Column({
    name: 'weight',
  })
  weight: number;

  /*
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
  */
}
