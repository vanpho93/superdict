export const isExpired = (created: string | Date, expiredTime: number) => {
  const now = Date.now()
  const getTimeByString = (str: string) => new Date(`${str} GMT+0`).getTime()
  const time = typeof created === 'string' ? getTimeByString(created) : created.getTime()
  return time + expiredTime < now
}

export const generateRandomCode = (length: number) => {
  if (isNaN(length) || length <= 0) throw new Error('INVALID_LENGTH')

  const createRandom10Symbols = () => Math.random().toString(36).substring(2)

  let randomString = ''
  while (randomString.length < length) randomString += createRandom10Symbols()

  return randomString.substr(0, length)
}

export const getFileExtenstion = (originalname: string) => {
  const originalnameSplit = originalname.split('.')
  const fileExtension = originalnameSplit.pop()
  return fileExtension
}

export const getFileName = (originalname: string) => {
  const originalnameSplit = originalname.split('.')
  originalnameSplit.pop()
  const name = originalnameSplit.join('.')
  return name
}
