require('dotenv').config();
export default {
    host: process.env.S3_HOST || 'http://contractscan.s3.localhost.localstack.cloud:4566',
    bucket: process.env.S3_BUCKET || 'contractscan',
    network: {
        1: {
            key: `data_1.json`,
            indexKey: `index_1.json`
        },
        5: {
            key: `data_5.json`,
            indexKey: `index_5.json`
        }
    },
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.AWS_REGION_NAME,
}

  