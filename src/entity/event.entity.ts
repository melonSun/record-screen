import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
@Entity('syn_event')
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({type: 'longtext' })
  data: () => {};

  @Column({type: "bigint"})
  timestamp: number;

  @Column({type: "bigint"})
  session_id: number;
  // @Column()
  // user: 
}