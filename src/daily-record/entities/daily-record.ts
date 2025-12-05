import { BaseModel } from 'src/common/base-model';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ft_daily_record')
export class DailyRecord extends BaseModel {
  @PrimaryColumn({
    name: 'record_key',
    type: 'uuid',
  })
  key: string;

  @Column({
    name: 'user_key',
    type: 'uuid',
  })
  userKey: string;

  @Column({
    name: 'record_date',
  })
  recordDate: Date;

  @Column({
    name: 'weight',
  })
  weight: number;

  @Column({
    name: 'intake_count',
  })
  intakeCount: number;

  @Column({
    name: 'ttl_calories',
  })
  totalCalories: number;

  @Column({
    name: 'exercise_count',
  })
  exerciseCount: number;

  @Column({
    name: 'ttl_energy_burn',
  })
  totalEnergyBurn: number;
}
