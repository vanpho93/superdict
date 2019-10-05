import { Constants } from '../global-refs'

export class NumberHelper {
  static isGreaterThan(a: number, b: number) {
    return Number(a.toFixed(Constants.PRECISION)) > Number(b.toFixed(Constants.PRECISION))
  }

  static isGreaterThanOrEqualTo(a: number, b: number) {
    return Number(a.toFixed(Constants.PRECISION)) >= Number(b.toFixed(Constants.PRECISION))
  }

  static isEqualTo(a: number, b: number) {
    return Number(a.toFixed(Constants.PRECISION)) === Number(b.toFixed(Constants.PRECISION))
  }

  static isNaturalNumber = (value: number) => {
    return value >= 0 && Math.floor(value) === +value
  }

  static isValidId = (value: number) => {
    return NumberHelper.isNaturalNumber(value) && value <= Constants.MAXIMUM_INTEGER_4_BYTES
  }
}
