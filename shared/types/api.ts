export interface ApiError {
  error: string
  details?: unknown
}

export interface Paginated<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
