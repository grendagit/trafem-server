import { EndUser } from './EndUser'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm'
import { Min, Max } from 'class-validator'

enum EEventType {
  TRIP = 'trip',
  PARTY = 'party',
}

@Entity()
@Check(`longitude_range`, `  longitude >= -180 AND longitude <= 180`)
@Check(`latitude_range`, `latitude >= -90 AND latitude <= 90`)
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  end_user_id: number

  @ManyToOne(() => EndUser, user => user.events, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'end_user_id' })
  end_user: EndUser

  @Column({
    type: 'enum',
    enum: EEventType,
    enumName: 't_event_type',
  })
  event_type: EEventType

  @Column({ type: 'numeric', precision: 2 })
  @Min(-180)
  @Max(180)
  longitude: number

  @Column({ type: 'numeric', precision: 2 })
  @Min(-90)
  @Max(90)
  latitude: number
}
