import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

// 这里可以修改表名
@Entity('syndatabase')
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({type: 'longtext' })
  data: () => {};

  @Column({type: "bigint"})
  timestamp: number;

  // @Column()
  // user: 
}