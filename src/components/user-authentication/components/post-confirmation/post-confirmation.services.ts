import { CognitoIdentityServiceProvider } from 'aws-sdk'

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

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

export async function setUpEndUserId(endUser: EndUser, ctx: TContext) {
  const {
    envVars: { USER_POOL_ID },
  } = ctx

  try {
    await cognitoIdentityServiceProvider
      .adminUpdateUserAttributes({
        UserAttributes: [
          {
            Name: 'custom:id',
            Value: endUser.id.toString(),
          },
        ],
        UserPoolId: USER_POOL_ID,
        Username: endUser.email,
      })
      .promise()
  } catch (error) {
    throw new Error(`Failed to set up end user id. Reason: ${error.message}`)
  }
}
