import { TimeHelper } from '.'

async function neverSleep() {
  if (process.env.NODE_ENV === 'local') return
  while (true) {
    await fetch(process.env.SERVER_URL)
    await TimeHelper.wait(60 * 1000)
  }
}

neverSleep()
