import { knex, Redis, EEnviroment, User, getEnvKey, WordType } from '../global-refs'

function addDefaultTestHooks() {
  if (getEnvKey('NODE_ENV') !== EEnviroment.TEST) return
  beforeEach('Remove all data before each test case', async () => {
    await User.deleteMany({})
    await WordType.deleteMany({})
    await Redis.flushall()
  })

  after(async () => {
    await knex.destroy()
    setTimeout(() => process.exit(0), 1000)
  })
}

addDefaultTestHooks()
