import { isArray } from 'util'
import { isEmpty, isNil } from 'lodash'

export const isEmptyArray = (someArray: Array<unknown>) => {
  return isArray(someArray) && isEmpty(someArray)
}

export const isNotEmptyArray = (someArray: Array<unknown>) => {
  return !isEmptyArray(someArray)
}

// tslint:disable-next-line: no-any
export const exist = (value: any) => {
  return !isNil(value)
}

// tslint:disable-next-line: no-any
export const isNotEmpty = (value: any) => {
  return !isEmpty(value)
}
