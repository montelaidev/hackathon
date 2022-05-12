require('dotenv').config();
export default {
    host: process.env.S3_HOST || 'http://contractscan.s3.localhost.localstack.cloud:4566',
    bucket: process.env.S3_BUCKET || 'contractscan',
    key: process.env.S3_KEY || 'data.json',
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.AWS_REGION_NAME,
}
  