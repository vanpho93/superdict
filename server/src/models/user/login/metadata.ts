export interface ILoginInput {
  email: string
  password: string
  isRememberMe?: boolean
}

export enum ELoginError {
  EMAIL_DOES_NOT_EXIST = 'EMAIL_DOES_NOT_EXIST',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}
