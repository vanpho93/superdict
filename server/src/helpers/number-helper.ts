import { Constants } from '../global-refs'

export class NumberHelper {
  static isNaturalNumber = (value: number) => {
    return value >= 0 && Math.floor(value) === +value
  }

  static isValidId = (value: number) => {
    return NumberHelper.isNaturalNumber(value) && value <= Constants.MAXIMUM_INTEGER_4_BYTES
  }
}
