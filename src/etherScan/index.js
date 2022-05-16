import axios from "axios";
import config from '../config/etherscan'
let axiosInstance = new Map()

const getInstance = (chainId = 1) => {
    if (
        !axiosInstance.has(chainId)
    ){
        const instance = axios.create({
            baseURL: config.uri.network[chainId],
            timeout: 30000
        });
        axiosInstance.set(chainId, instance)     
    }
    return axiosInstance.get(chainId)
}

export const getTransaction = async(address, order = 'asc', chainId = 1) => {
    const i = getInstance(chainId);
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

export const verifyContract = async(address, chainId = 1) => {
    const i = getInstance(chainId);
    const params = {
        module: 'contract',
        action: 'getabi',
        address,
        apikey:config.apiKey
    };
   const r =  await i.get('', {params});
   return r.data ? r.data.message === 'OK' : false
}

export const extractAddFromTCWithDrawLog = (data) => {
  let start = 26, end = 66;
  return "0x"+data.slice(start, end)
}

export const getDataFromLogs = async(address, topic, from = 1, to = 'latest', chainId = 1) => {
    const i = getInstance(chainId);
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