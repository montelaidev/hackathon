import axios from "axios";
import config from '../config/etherscan'
let axiosInstance = null
const getInstance = () => {
    if(axiosInstance === null)
    {
        axiosInstance = axios.create({
            baseURL: config.uri,
            timeout: 3000
        });
    }
    return axiosInstance;
}

export const getDeployer = async(address) => {
    const i = getInstance();
    const params = {
        module: 'account',
        action: 'txlist',
        address,
        page: 1,
        offset:1,
        sort:'asc',
        apikey:config.apiKey
    };
  
   const r =  await i.get('', {params});
   return r.data ? r.data.result[0] : null
}

export const getInternalTransaction = async(address) => {
    const i = getInstance();
    const params = {
        module: 'account',
        action: 'txlistinternal',
        address,
        page: 1,
        offset:10000,
        sort:'asc',
        apikey:config.apiKey
    };
  
   const r =  await i.get('', {params});
   return r.data ? r.data.result : null
}
