export interface ErrorState {
  message: string;
}

export type AsyncState<T, E = {}> = {
  state: T
  isLoading: boolean
  errorMessage?: string
} & E
