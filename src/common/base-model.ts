import { Column } from 'typeorm';
import { Exclude as ExcludeTransform } from 'class-transformer';

export class BaseModel {
  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ExcludeTransform()
  createdAt: Date;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  @ExcludeTransform()
  createdBy: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ExcludeTransform()
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  @ExcludeTransform()
  updatedBy: string;
}
