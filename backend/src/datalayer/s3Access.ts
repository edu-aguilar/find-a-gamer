import { S3 } from 'aws-sdk'

const bucketName = process.env.EVENTS_IMAGES_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const s3 = new S3({ signatureVersion: 'v4' })

export function generateSignedUrl(imageId: string) {

  const signedUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  })

  const imgUrl = `https://${bucketName}.s3.amazonaws.com/${imageId}`

  return {
    signedUrl,
    imgUrl
  }
}
