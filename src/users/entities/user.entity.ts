import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('td_user')
export class User {
    @PrimaryColumn({
      name: 'key',
      type: 'uuid'
    })
    key: string;

    @Column({
      name: 'org_key',
      type: 'varchar'
    })
    @Index('idx_user_org')
    organization: string;

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
        default: true
    })
    isActive: boolean;
}