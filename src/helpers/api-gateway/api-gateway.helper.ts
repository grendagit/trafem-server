import type { TContext } from 'src/types/context.type'
import type { TCORSConfig, TResponse } from './api-gateway.types'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const formatJSONResponse = (
  { body, statusCode = 200, headers }: TResponse,
  ctx: TContext
) => {
  const { logger } = ctx

  logger.info({
    message: 'Lambda response',
    data: {
      statusCode,
      body,
    },
  })
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  }
}

export function getCORSHeaders(origin, method = '*', ctx: TContext) {
  const {
    logger,
    envVars: { CORS_CONFIG },
  } = ctx

  let CORSConfig: TCORSConfig
  try {
    CORSConfig = JSON.parse(CORS_CONFIG)
  } catch (error) {
    logger.error({
      message: 'Parsing CORS is unsuccessful',
    })
    throw error
  }
  const allowedOrigin = CORSConfig.allowedOrigin.split(',')

  return {
    'Access-Control-Allow-Headers': CORSConfig.allowedHeaders,
    'Access-Control-Allow-Methods': `OPTIONS,${method.toUpperCase()}`,
    'Access-Control-Allow-Origin': allowedOrigin.includes(origin)
      ? origin
      : 'deny',
  }
}
