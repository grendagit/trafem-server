import type { Generic } from 'src/types/generic.type'

export type TResponse = {
  body: any
  statusCode?: number
  headers?: Generic
}
export type TCORSConfig = {
  allowedHeaders: string
  allowedOrigin: string
}
