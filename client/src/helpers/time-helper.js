export const ONE_DAY_IN_MILLISECOND = 86400000

export class TimeHelper {
  static before(periodInMilis, from = new Date()) {
    return new Date((new Date()).getTime() - periodInMilis)
  }

  static after(periodInMilis, from = new Date()) {
    return new Date((new Date()).getTime() + periodInMilis)
  }

  static getDate(dateInMillisecond) {
    const startOfDate = Math.floor(dateInMillisecond / ONE_DAY_IN_MILLISECOND) * ONE_DAY_IN_MILLISECOND
    const endOfDate = Math.ceil(dateInMillisecond / ONE_DAY_IN_MILLISECOND) * ONE_DAY_IN_MILLISECOND
    return {
      startAt: new Date(startOfDate),
      endAt: new Date(endOfDate),
    }
  }

  static getMonth(year, month) { // month: 0 - 11
    return {
      startAt: new Date(year, month, 1),
      endAt: new Date(year, month + 1, 1),
    }
  }

  static greaterThan(a, b) {
    return new Date(a).getTime() > new Date(b).getTime()
  }

  static smallerThan(a, b) {
    return new Date(a).getTime() < new Date(b).getTime()
  }

  static wait(millisecond) {
    return new Promise(resolve => setTimeout(resolve, millisecond))
  }

  static getDefaultTimeState() {
    const fromDate = TimeHelper.before(8 * ONE_DAY_IN_MILLISECOND, TimeHelper.getDate(Date.now()).startAt).getTime()
    const toDate = TimeHelper.getDate(Date.now() + ONE_DAY_IN_MILLISECOND).startAt.getTime()
    return { fromDate, toDate }
  }
}
