export function transformQueryStringParametersValue(value: string) {
  return value.replace(/-/g, '_')
}
