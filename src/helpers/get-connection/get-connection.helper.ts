import { EndUser, Event } from 'src/entities'
import type { TContext } from 'src/types/context.type'

import { createConnection } from 'typeorm'
import type { Connection } from 'typeorm'
import 'reflect-metadata'

let cachedConnection: Connection

export async function getConnection(ctx: TContext): Promise<Connection> {
  const {
    logger,
    envVars: { SECRET_ARN, RESOURCE_ARN, REGION },
  } = ctx

  if (cachedConnection) {
    return cachedConnection
  }

  try {
    cachedConnection = await createConnection({
      type: 'aurora-data-api-pg',
      database: 'trafem',
      secretArn: SECRET_ARN,
      resourceArn: RESOURCE_ARN,
      region: REGION,
      entities: [EndUser, Event],
    })
  } catch (error) {
    logger.error({
      message: `Creating connection is unsuccessful. Reason: ${error.message}`,
    })
    throw error
  }
  logger.info({
    message: 'Creating connection is successful',
  })

  return cachedConnection
}
