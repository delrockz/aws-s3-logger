const handler = async () => {
  const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
  const s3Client = new S3Client({ region: process.env.Region })

  try {
    let currentTime = new Date()
    const params = {
      Bucket: process.env.BucketName,
      Key: `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}/log_${currentTime.getTime().toString()}.txt`,
      Body: `LOG: This function was invoked at ${currentTime.toUTCString()}`,
    }
    const result = await s3Client.send(new PutObjectCommand(params))
    return result
  } catch (err) {
    console.log('Error', err)
  }
}
module.exports.handler = handler
