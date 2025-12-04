import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ft_user')
export class User {
  @PrimaryColumn({
    name: 'key',
    type: 'uuid',
  })
  key: string;

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

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;
}
