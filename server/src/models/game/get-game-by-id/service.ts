// tslint:disable-next-line: no-require-imports
const cherio = require('cherio')
import { ApiService, Fetch } from '../../../global-refs'
import { IInput, IOutput } from './metadata'

export class Service extends ApiService<IInput, IOutput> {
  public async process(): Promise<IOutput> {
    await super.process()
    const html = await this.getHtmlFromAsianBookie()
    const $ = cherio.load(html)

    const home = $('table tbody tr td table tbody')[1]
    const away = $('table tbody tr td table tbody')[2]
    const homeBets = this.getHomeAwayBets($, home)
    const awayBets = this.getHomeAwayBets($, away)
    return { homeBets, awayBets }
  }

  // tslint:disable-next-line: no-any
  private getHomeAwayBets($: any, side: 'HOME' | 'AWAY') {
    const result = []

    const position = side === 'HOME' ? 1 : 2
    const container = $('table tbody tr td table tbody')[position]
    const homeLength = $(container).find('tr').length
    for (let index = 1; index < homeLength; index++) {
      const row = $(container).find('tr').eq(index).find('font')
      const no = Number(row.eq(0).text().trim())
      const name = row.eq(position).text().trim()
      const isBig = $(container).find('tr').eq(index).find('img').length === 1
      result.push({ name, no, isBig })
    }
    return result
  }

  private getHtmlFromAsianBookie() {
    const ASIAN_BOOKIE_URL = `https://tipsters.asianbookie.com/matchstat.cfm?id=${this.input.gameId}`
    return Fetch.getText(ASIAN_BOOKIE_URL)
  }
}
