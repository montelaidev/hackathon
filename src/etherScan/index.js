import axios from "axios";
import config from '../config/etherscan'
let axiosInstance = null

const getInstance = () => {
    if(axiosInstance === null)
    {
        axiosInstance = axios.create({
            baseURL: config.uri,
            timeout: 30000
        });
    }
    return axiosInstance;
}

export const getTransaction = async(address, order = 'asc') => {
    const i = getInstance();
    const params = {
        module: 'account',
        action: 'txlist',
        address,
        page: 1,
        offset:1,
        sort:order,
        apikey:config.apiKey
    };
  
   const r =  await i.get('', {params});
   return r.data ? r.data.result[0] : null
}

export const extractAddFromTCWithDrawLog = (data) => {
  let start = 26, end = 66;
  return "0x"+data.slice(start, end)
}

export const getDataFromLogs = async(address, topic, from = 1, to = 'latest') => {
    const i = getInstance();
    const params = {
        module: 'logs',
        action: 'getLogs',
        address,
        fromBlock: from,
        toBlock:to,
        topic0:topic,
        apikey:config.apiKey
    };
   const r =  await i.get('', {params});
   return r.data ? r.data.result : null
}

export const MAX_COUNT = 1000