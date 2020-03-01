// tslint:disable-next-line: no-require-imports
const cherio = require('cherio')
import { Fetch, Tipster } from '../global-refs'

export class UpdateTipster {
  static async process() {
    const ASIAN_BOOKIE_URL = 'https://tipsters.asianbookie.com/index.cfm?top20=1'
    const html = await Fetch.getText(ASIAN_BOOKIE_URL)
    const $ = cherio.load(html)

    const MAXIMUM_TIPSTER_COUNT = 300
    const result = []
    for (let index = 1; index < MAXIMUM_TIPSTER_COUNT; index++) {
      try {
        result.push(this.parseTipser($, index))
      } catch (error) {
        // do nothing
      }
      await Tipster.deleteMany({})
      await Tipster.createMany(result)
    }
  }

  // tslint:disable-next-line: no-any
  private static parseTipser($: any, index: number) {
    const tr = $('.altrow tr')[index]
    const no = processNo($(tr).find('td').eq(0).text().split('\n')[1])
    const name = $(tr).find('td').eq(1).text().trim()

    // get id
    const link: string = $(tr).find('a').eq(0).attr('href')
    const fromIndex = link.lastIndexOf('=')
    const tipsterId = link.substring(fromIndex + 1)

    const winCount = Number($(tr).find('td').eq(2).text().trim())
    const drawCount = Number($(tr).find('td').eq(3).text().trim())
    const loseCount = Number($(tr).find('td').eq(4).text().trim())

    const winRate = $(tr).find('td').eq(5).text().trim()
    const bigBetWinRate = $(tr).find('td').eq(6).text().trim()
    const yieldValue = $(tr).find('td').eq(7).text().trim()
    const balance = $(tr).find('td').eq(10).text().trim()

    return {
      tipsterId: Number(tipsterId),
      no,
      name,
      winCount,
      drawCount,
      loseCount,

      winRate: processRate(winRate),
      bigBetWinRate: processRate(bigBetWinRate),
      yield: processRate(yieldValue),
      balance: processBalance(balance),
    }

    function removeComma(str: string) {
      while (str.includes(',')) str = str.replace(',', '');
      return str
    }

    function processRate(rate: string) {
      return parseFloat(rate) / 100
    }

    function processBalance(balance: string) {
      return Number(removeComma(balance.substring(4).trim()))
    }

    function processNo(no: string) {
      const dotIndex = no.indexOf('.')
      return Number(no.substring(0, dotIndex))
    }
  }
}
