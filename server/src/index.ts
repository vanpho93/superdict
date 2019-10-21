/* istanbul ignore file */
import { app } from './app'
import { getEnvKey, neverSleep } from './global-refs'
import { scan } from './scanner/scan'

app.listen(Number(getEnvKey('PORT')), () => console.debug(`Server started at port ${getEnvKey('PORT')}`))
scan()
neverSleep()
