import { EndUser, EndUserProfile } from 'src/entities'
import type { TContext } from 'src/types/context.type'
import type {
  TEndUserData,
  TEndUserProfileData,
} from './post-confirmation.types'

import type { Connection } from 'typeorm'

export async function createEndUser(
  endUserData: TEndUserData,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  try {
    const endUserRepository = connection.getRepository(EndUser)
    const endUser = EndUser.create(endUserData)

    return await endUserRepository.save(endUser)
  } catch (error) {
    logger.error({
      message: `Failed to create end user. Reason ${error.message}`,
    })
    throw error
  }
}

export async function createEndUserProfile(
  endUserProfileData: TEndUserProfileData,
  connection: Connection,
  ctx: TContext
) {
  const { logger } = ctx

  try {
    const endUserProfileRepository = connection.getRepository(EndUserProfile)
    const endUserProfile = EndUserProfile.create(endUserProfileData)

    return await endUserProfileRepository.save(endUserProfile)
  } catch (error) {
    logger.error({
      message: `Failed to create end user profile. Reason ${error.message}`,
    })
    throw error
  }
}
