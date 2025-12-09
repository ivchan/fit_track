import { BaseModel } from 'src/common/base-model';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ft_daily_weight')
export class DailyWeight extends BaseModel {
  @PrimaryColumn({
    name: 'weight_key',
    //type: 'uuid',
    type: 'varchar',
    length: 36,
  })
  key: string;

  @Column({
    name: 'user_key',
    //type: 'uuid',
    type: 'varchar',
    length: 36,
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
}
