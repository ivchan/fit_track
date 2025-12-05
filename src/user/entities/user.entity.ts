import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Exclude as ExcludeTransform } from 'class-transformer';
import { BaseModel } from 'src/common/base-model';

@Entity('ft_user')
export class User extends BaseModel {
  @PrimaryColumn({
    name: 'user_key',
    type: 'uuid',
  })
  key: string;

  @Column({
    name: 'user_code',
    type: 'varchar',
    length: 10,
  })
  userCode: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 100,
  })
  userName: string;

  @Column({
    name: 'email_address',
    type: 'varchar',
    length: 200,
  })
  emailAddress: string;

  @ExcludeTransform()
  @Column({
    name: 'pwd_hashed',
    type: 'varchar',
    length: 200,
  })
  passwordHash: string;
}
