import validator from '@middy/validator'

export type TPrimaryMaterials = {
  envVarsPromise: Promise<void>
  validatorOptions: Parameters<typeof validator>[0]
}
