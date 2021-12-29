import type { ValueTransformer } from 'typeorm'

function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined {
  return typeof value === 'undefined' || value === null
}

export class ColumnNumericTransformer implements ValueTransformer {
  to(numeric?: number | null) {
    if (!isNullOrUndefined(numeric)) {
      return numeric
    }
    return null
  }

  from(numeric?: string | null) {
    if (!isNullOrUndefined(numeric)) {
      const tranformedNumeric = parseFloat(numeric)
      if (isNaN(tranformedNumeric)) {
        return null
      } else {
        return tranformedNumeric
      }
    }
    return null
  }
}
