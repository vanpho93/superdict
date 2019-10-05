import { getEnvKey } from '../global-refs'
import { isNil } from 'lodash'

export enum EScannerTask {
  DEPOSIT = 'DEPOSIT',
  INTERNAL_ADDRESS = 'INTERNAL_ADDRESS',
  ACCEPT_WITHDRAW = 'ACCEPT_WITHDRAW',
  START_NEW_MINERS = 'START_NEW_MINERS',
  UPDATE_EST_MINER_EARNING = 'UPDATE_EST_MINER_EARNING',
  NOTIFY_UNICORN_TRANSACTION = 'NOTIFY_UNICORN_TRANSACTION',
}

export class Scanner {
  static scan() {
    if (!this.currentTasks.includes(this.getTaskName())) return
    return this.process()
  }

  private static get currentTasks(): EScannerTask[] {
    const SUPER_DICT_SCAN_TASKS = getEnvKey('SUPER_DICT_SCAN_TASKS')
    if (isNil(SUPER_DICT_SCAN_TASKS)) return []
    return SUPER_DICT_SCAN_TASKS.split(',') as EScannerTask[]
  }

  protected static async process() {
    return
  }

  protected static getTaskName(): EScannerTask {
    return
  }
}
