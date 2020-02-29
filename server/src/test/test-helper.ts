import td from 'testdouble'
import { knex, Redis, EEnviroment, Tipster, getEnvKey } from '../global-refs'

function addDefaultTestHooks() {
  if (getEnvKey('NODE_ENV') !== EEnviroment.TEST) return
  beforeEach('Remove all data before each test case', async () => {
    await Tipster.deleteMany({})
    await Redis.flushall()
  })

  afterEach(() => td.reset())

  after(async () => {
    await knex.destroy()
    setTimeout(() => process.exit(0), 1000)
  })
}

addDefaultTestHooks()
