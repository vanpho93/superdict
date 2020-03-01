import { createModel } from './create-model'
import { Tables } from '../global-refs'

export interface ITipster {
  tipsterId: number
  name: string
  no: number
  winCount: number
  drawCount: number
  loseCount: number
  balance: number
  winRate: number
  bigBetWinRate: number
  yield: number
  modified: Date | string
  created: Date | string
}

export class Tipster extends createModel<ITipster>(Tables.TIPSTER) {}
