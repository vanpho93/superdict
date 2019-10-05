/* istanbul ignore file */
import { CronJob, CronCommand } from 'cron'

function createJob(time: string, cb: CronCommand, runOnInit = false) {
  new CronJob(time, cb, null, true, null, undefined, runOnInit).start()
}

enum ECronTime {
  EVERY_ONE_SECOND = '*/1 * * * * *',
  EVERY_FIFTEEN_SECONDS = '*/15 * * * * *',
  EVERY_ONE_MINUTE = '0 */1 * * * *',
  EVERY_THREE_MINUTES = '0 */3 * * * *',
  EVERY_FIVE_MINUTES = '0 */5 * * * *',
  EVERY_TEN_MINUTES = '0 */10 * * * *',
}

export async function scan() {
  //
}
