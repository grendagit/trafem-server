import { EndUser } from 'src/entities'
import * as postConfirmationDAL from './post-confirmation.dal'
import type { TContext } from 'src/types/context.type'
import type { Generic } from 'src/types/generic.type'

import type { Connection } from 'typeorm'

export function createEndUser(
  userAttributes: Generic,
  connection: Connection,
  ctx: TContext
) {
  const { email } = userAttributes
  const data = {
    email,
  }
  return postConfirmationDAL.createEndUser(data, connection, ctx)
}

export function createEndUserProfile(
  endUser: EndUser,
  userAttributes: Generic,
  connection: Connection,
  ctx: TContext
) {
  const { given_name, family_name } = userAttributes

  const data = {
    given_name,
    family_name,
    end_user_id: endUser.id,
  }
  return postConfirmationDAL.createEndUserProfile(data, connection, ctx)
}
