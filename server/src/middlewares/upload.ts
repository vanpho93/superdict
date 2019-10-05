import multer from 'multer'
import { Settings } from '../settings'

const multerOptions = {
  storage: multer.memoryStorage(),
  limits: { fileSize: Settings.UPLOADING_FILE_SIZE },
}

const fieldsConfig = [
  { name: 'frontOfCard', maxCount: 1 },
  { name: 'backOfCard', maxCount: 1 },
  { name: 'avatar', maxCount: 1 },
]

export const uploadMiddleware = multer(multerOptions).fields(fieldsConfig)
