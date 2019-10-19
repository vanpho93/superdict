import fetch from 'node-fetch'
import { getEnvKey, EEnviroment } from './'

function sendTelegramMessage(chatId: number, text: string) {
  if (getEnvKey('NODE_ENV') === EEnviroment.TEST) return
  if (getEnvKey('NODE_ENV') === EEnviroment.LOCAL) return console.log(`TELEGRAM:\n ${text}`)
  const UNICORN_BOT_TOKEN = '661169231:AAG0WCBUYxOlZur9FHCfAB6G3nCTtQ2Qy_A'
  const url = `https://api.telegram.org/bot${UNICORN_BOT_TOKEN}/sendMessage`
  // tslint:disable-next-line: variable-name
  const parse_mode = text.includes('<b>') ? 'html' : 'markdown'
  const body = JSON.stringify({ chat_id: chatId, text, parse_mode })
  return fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
}

const CHAT_ID_DEV = -1001319286354

export class Telegram {
  static sendMessageToKycGroup(text: string) {
    const CHAT_ID_PRODUCTION_NORMAL = -1001495001528
    const chatId = getEnvKey('NODE_ENV') === EEnviroment.PRODUCTION ? CHAT_ID_PRODUCTION_NORMAL : CHAT_ID_DEV
    return sendTelegramMessage(chatId, text)
  }

  static sendMessageToTransactionGroup(text: string) {
    const CHAT_ID_PRODUCTION_TRANSACTION = -1001346145108
    const chatId = getEnvKey('NODE_ENV') === EEnviroment.PRODUCTION ? CHAT_ID_PRODUCTION_TRANSACTION : CHAT_ID_DEV
    return sendTelegramMessage(chatId, text)
  }

  static sendMessageToLeaders(text: string) {
    const CHAT_ID_PRODUCTION_LEADERS = -1001156950283
    if (getEnvKey('NODE_ENV') !== EEnviroment.PRODUCTION) return
    return sendTelegramMessage(CHAT_ID_PRODUCTION_LEADERS, text)
  }

  static sendMessageToDev(text: string) {
    return sendTelegramMessage(CHAT_ID_DEV, text)
  }

  static sendMessageToInternationalInvestor(text: string) {
    // if (getEnvKey('NODE_ENV') !== EEnviroment.PRODUCTION) return
    // const CHAT_ID_INTERNATIONAL_INVESTOR = CHAT_ID_DEV
    // return sendTelegramMessage(CHAT_ID_INTERNATIONAL_INVESTOR, text)
  }

  static sendMessageToCambodiaInvestor(text: string) {
    // if (getEnvKey('NODE_ENV') !== EEnviroment.PRODUCTION) return
    // const CHAT_ID_CAMBODIA_INVESTOR = CHAT_ID_DEV
    // return sendTelegramMessage(CHAT_ID_CAMBODIA_INVESTOR, text)
  }

  static sendMessageToVietnameseInvestor(text: string) {
    const CHAT_ID_VIETNAMESE_LEADERS = CHAT_ID_DEV
    return sendTelegramMessage(CHAT_ID_VIETNAMESE_LEADERS, text)
  }
}
