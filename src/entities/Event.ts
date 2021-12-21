import { EndUser } from './EndUser'
import { ColumnNumericTransformer } from './helpers/numeric-transformer.helper'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Check,
  CreateDateColumn,
} from 'typeorm'
import { Min, Max, MaxLength } from 'class-validator'

export enum EEventType {
  TRIP = 'trip',
  PARTY = 'party',
}

@Entity()
@Check(`longitude_range`, `  longitude >= -180 AND longitude <= 180`)
@Check(`latitude_range`, `latitude >= -90 AND latitude <= 90`)
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
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

  @Column({
    type: 'numeric',
    precision: 6,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  @Min(-180)
  @Max(180)
  longitude: number

  @Column({
    type: 'numeric',
    precision: 6,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  @Min(-90)
  @Max(90)
  latitude: number

  @Column({ type: 'varchar', length: 64 })
  @MaxLength(64)
  title: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'int', nullable: true })
  participation_price_min: number
  @Column({ type: 'int' })
  participation_price_max: number

  @Column({ type: 'timestamp', nullable: true })
  duration_from: Date
  @Column({ type: 'timestamp' })
  duration_to: Date

  @CreateDateColumn()
  created_at: Date
}
