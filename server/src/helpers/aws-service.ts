import AWS from 'aws-sdk'
import { EEnviroment, generateRandomCode, getEnvKey } from '../global-refs'
import { getFileExtenstion } from './utility'

export interface IFileInput {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

const { AWS_ACCESSS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION } = process.env

AWS.config.update({
  accessKeyId: AWS_ACCESSS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

export async function uploadFileToAWS(file: IFileInput) {
  const fileExtension = getFileExtenstion(file.originalname)
  const Key = `${Date.now()}-${generateRandomCode(7)}.${fileExtension}`
  const objectParams = { Bucket: AWS_BUCKET_NAME, Key, Body: file.buffer, ACL: 'public-read' }
  const fileUrl = `http://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${Key}`
  if (getEnvKey('NODE_ENV') !== EEnviroment.TEST) await s3.putObject(objectParams).promise()
  return fileUrl
}
