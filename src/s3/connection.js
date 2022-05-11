import * as AWS from 'aws-sdk';
import s3Config from '../config/s3';
const endpoint = s3Config.endpoint;
const region = s3Config.region;
let config = { apiVersion: '2006-03-01', s3ForcePathStyle: true,};
if (endpoint) {
    config = {
        ...config,
        endpoint: endpoint,
    };
}
if (region) {
    AWS.config.update({
        region
    });
}

export const connection = new AWS.S3(config);
