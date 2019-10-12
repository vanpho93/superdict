import { isNil } from 'lodash'
// tslint:disable-next-line: no-any
export const transformArrayParam = <T>(array: Array<T>): T[] => {
  if (isNil(array)) {
    array = []
  }
  if (typeof array === 'string') {
    array = [array]
  }
  return array
}
