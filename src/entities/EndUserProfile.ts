import { EndUser } from './EndUser'

import {
  Entity,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm'

@Entity()
export class EndUserProfile extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  end_user_id: number

  @OneToOne(() => EndUser)
  @JoinColumn({ name: 'end_user_id' })
  end_user: EndUser

  /**
   * TODO: specify length
   */
  @Column({ type: 'text' })
  given_name: string

  /**
   * TODO: specify length
   */
  @Column({ type: 'text' })
  family_name: string
}
