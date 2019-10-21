import fetch from 'node-fetch'
import { TimeHelper } from '.'

export async function neverSleep() {
  if (process.env.NODE_ENV === 'local') return
  while (true) {
    console.log(123)
    await fetch(process.env.SERVER_URL)
    await TimeHelper.wait(30 * 1000)
  }
}
