import { Constants } from '../global-refs'

export class TimeHelper {
  public static before(periodInMilis: number, from: Date | number = new Date()) {
    return new Date((new Date()).getTime() - periodInMilis)
  }

  public static after(periodInMilis: number, from: Date | number = new Date()) {
    return new Date((new Date()).getTime() + periodInMilis)
  }

  public static getDate(dateInMillisecond: number) {
    const startOfDate = Math.floor(dateInMillisecond / Constants.ONE_DAY_IN_MILLISECOND) * Constants.ONE_DAY_IN_MILLISECOND
    const endOfDate = Math.ceil(dateInMillisecond / Constants.ONE_DAY_IN_MILLISECOND) * Constants.ONE_DAY_IN_MILLISECOND
    return {
      startAt: new Date(startOfDate),
      endAt: new Date(endOfDate),
    }
  }

  public static getMonth(year: number, month: number) { // month: 0 - 11
    return {
      startAt: new Date(year, month, 1),
      endAt: new Date(year, month + 1, 1),
    }
  }

  public static greaterThan(a: number | string | Date, b: number | string | Date) {
    return new Date(a).getTime() > new Date(b).getTime()
  }

  public static smallerThan(a: number | string | Date, b: number | string | Date) {
    return new Date(a).getTime() < new Date(b).getTime()
  }

  public static wait(millisecond: number) {
    return new Promise(resolve => setTimeout(resolve, millisecond))
  }
}
