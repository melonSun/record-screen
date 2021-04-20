import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
@Entity('syn_session')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // sesion detail
  @Column({default: ''})
  ip: string;

  @Column({default: ''})
  browser: string;

  @Column({default: ''})
  browser_version: string;

  @Column({default: ''})
  browser_size: string

  @Column({default: ''})
  language: string

  @Column({default: ''})
  user_agent: string

  @Column({default: ''})
  referrer: string

  @Column({default: ''})
  system: string

  @Column({type: 'longtext'})
  start_time: number;

  @Column({type: 'longtext'})
  end_time: number;

  @Column({default: ''})
  user_id: string;
}