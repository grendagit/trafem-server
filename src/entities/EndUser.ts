import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  BaseEntity,
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
}
