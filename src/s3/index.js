import * as AWS from 'aws-sdk';
import { json } from 'express/lib/response';
import s3Config from '../config/s3';
import {connection} from './connection';


export const get = async (address) => {
    const params = {
        Bucket: s3Config.bucket,
        Key: s3Config.path
    };
    const data = await connection.getObject(params).promise();

    return JSON.parse(data.Body.toString('utf-8'));
};



export const put = async (address, data) => {
    const body = await get() || {};
    let o = body[address]
    body[address] = {...o, ...data}
    const params = {
        Bucket: s3Config.bucket,
        Key: s3Config.path,
        Body: JSON.stringify(body)
    };
    await connection.putObject(params).promise();
};