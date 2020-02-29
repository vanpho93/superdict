// tslint:disable-next-line: no-require-imports
const cherio = require('cherio')
import { ApiService, Fetch } from '../../global-refs'
import { IInput, IOutput } from './metadata'

export class Service extends ApiService<IInput, IOutput> {
  public async process(): Promise<IOutput> {
    await super.process()
    const html = await this.getHtmlFromAsianBookie()

    const $ = cherio.load(html)
    const { length } = $('.group')
    const result = []
    for (let index = 0; index < length; index++) {
      const currentGroup = $('.group')[index]

      const textFinder = $(currentGroup).find('tr td font b')
      const leagueName = textFinder.eq(0).text()
      const home = textFinder.eq(2).text()
      const homeRate = textFinder.eq(3).text()
      const awayRate = textFinder.eq(4).text()
      const away = textFinder.eq(5).text()
      const haHandicap = $(currentGroup).find('tr td font span').eq(1).text()

      const overRate = textFinder.eq(6).text()
      const ouHandicap = textFinder.eq(8).text().trim()
      const underRate = textFinder.eq(10).text().trim()
      const time = $(currentGroup).find('tr td b font').eq(1).text().trim()
      const game = $(currentGroup).find('input').eq(1).val()
      const gameId = game.substring(1, game.length - 1)

      result.push({
        leagueName,
        home,
        away,
        haHandicap,
        homeRate: Number(homeRate),
        awayRate: Number(awayRate),
        ouHandicap,
        overRate: Number(overRate),
        underRate: Number(underRate),
        time,
        gameId: Number(gameId),
      })
    }
    return result
  }

  private getHtmlFromAsianBookie() {
    const ASIAN_BOOKIE_URL = 'https://tipsters.asianbookie.com/'
    return Fetch.getText(ASIAN_BOOKIE_URL)
  }
}
