import * as Sentry from '@sentry/node'
import { getEnvKey, EEnviroment, Telegram } from './'

function getShouldCaptureBySentry() {
  return getEnvKey('NODE_ENV') !== EEnviroment.LOCAL && getEnvKey('NODE_ENV') !== EEnviroment.TEST
}

if (getShouldCaptureBySentry()) {
  Sentry.init({
    dsn: getEnvKey('SENTRY_DSN'),
    environment: getEnvKey('NODE_ENV'),
    beforeSend (event) {
      const errorMessage = event.exception.values[0].value
      Telegram.sendMessageToDev(`<b>BUG ${getEnvKey('NODE_ENV')}</b> ${errorMessage}`)
      return event
    },
  })
}

export function handleUnexpectedError(error: Error) {
  if (getShouldCaptureBySentry()) return Sentry.captureException(error)
  console.log(error)
}
