import { getValue } from './load-env-vars.controllers'
import { logger } from '@middlewares/load-logger'
import type { Generic } from 'src/types/generic.type'

let envVars: Generic = {}

export async function loadEnvVars(defaultValues: Generic) {
  try {
    const values = Object.entries(defaultValues).map(
      async ([key, defaultValue]) => {
        const value = await getValue(key)
        extendEnvVars(envVars, value, [key, defaultValue])
      }
    )
    await Promise.all(values)
  } catch (error) {
    logger.error({
      message: `Load environment variables is unsuccessful. Reason: ${error.message}`,
      data: {
        stack: error.stack,
      },
    })
    throw error
  }
  logger.info({
    message: 'Load environment variables is successful',
    data: {
      envVars,
    },
  })
}

function extendEnvVars(
  envVars: Generic,
  value: string,
  [key, defaultValue]: [string, string | number]
) {
  envVars[key] = value || defaultValue
}

export function getEnvVars() {
  if (!envVars) {
    throw new Error('Environment variables are not loaded')
  }
  return envVars
}
