import { Event } from './Event'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { IsEmail } from 'class-validator'

@Entity()
@Check(`email_col_len`, `length("email") <= 2048`)
export class EndUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  @IsEmail(undefined, { message: 'E-mail is invalid' })
  email: string

  @OneToMany(() => Event, event => event.end_user)
  events: Event[]
}
