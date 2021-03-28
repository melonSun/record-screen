import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
@Entity('syn_session')
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // sesion detail
  @Column()
  ip: string;

  @Column()
  browser: string;

  @Column()
  browser_version: string;

  @Column()
  language: string

  @Column()
  user_agent: string

  @Column()
  referrer: string

  @Column()
  system: string

  @Column()
  browser_size: string

  @Column({type: 'bigint' })
  start_time: number;

  @Column({type: 'bigint' })
  end_time: number;

  @Column()
  user_id: number;
  // location
}