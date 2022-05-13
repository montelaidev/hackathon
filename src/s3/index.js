import s3Config from '../config/s3';
import {connection} from './connection';

export const get = async (key) => {
    try {
        const params = {
            Bucket: s3Config.bucket,
            Key: key
        };
        const data = await connection.getObject(params).promise();
        return JSON.parse(data.Body.toString('utf-8'));
    } catch(e)
    {
        if( e.statusCode == 404 )
        {
            return null;
        }
        throw e
    }
};

export const put = async (address, key, data, list = {}) => {
    const body = Object.keys(list).length === 0  ? await get(key) || {} : list
    body[address] = data
    const params = {
        Bucket: s3Config.bucket,
        Key: key,
        Body: JSON.stringify(body)
    };
    await connection.putObject(params).promise();
    return body
};

export const write = async (body, key) => {
    const params = {
        Bucket: s3Config.bucket,
        Key: key,
        Body: JSON.stringify(body)
    };
    await connection.putObject(params).promise();
    return body
};
