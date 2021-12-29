import { getParameter, getSecretValue } from './load-env-vars.services'

export async function getValue(key: string) {
  let value = process.env[key] || ''

  if (value.startsWith('parameter:')) {
    value = await getParameter(value)
  } else if (value.startsWith('secret:')) {
    value = await getSecretValue(value)
  }

  return value
}
