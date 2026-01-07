import { Entity, PrimaryColumn } from 'typeorm';
import { BaseModel } from 'src/common/base-model';

@Entity('ft_meal')
export class Meal extends BaseModel {
  @PrimaryColumn({
    name: 'user_key',
    type: 'varchar',
    length: 36,
  })
  key: string;

  mealCode: string;
  mealName: string;
  calories: number;
  mealPhotoKey: string;
}
