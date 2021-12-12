import { SSM, SecretsManager } from 'aws-sdk'

const ssm = new SSM()

export async function getParameter(value: string): Promise<string> {
  const parameterName = value.replace('parameter:', '')

  try {
    const { Parameter: { Value: parameterValue } = {} } = await ssm
      .getParameter({
        Name: parameterName,
      })
      .promise()
    return parameterValue || ''
  } catch (error) {
    throw new Error(`Failed to get parameter. Reason: ${error.message}`)
  }
}

const secretsManager = new SecretsManager()

export async function getSecretValue(value: string): Promise<string> {
  const secretName = value.replace('secret:', '')

  try {
    const { SecretString: secretString } = await secretsManager
      .getSecretValue({
        SecretId: secretName,
      })
      .promise()
    return secretString || ''
  } catch (error) {
    throw new Error(`Failed to get secret value. Reason: ${error.message}`)
  }
}
