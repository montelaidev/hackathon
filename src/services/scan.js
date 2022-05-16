import {getTransaction, getDataFromLogs, extractAddFromTCWithDrawLog,verifyContract, MAX_COUNT} from '../etherScan'
import {get,  write} from "../s3";
import appConfig from "../config/app";
import { LEVELS } from "../constants/levels"
import {getS3DataKey, getS3IndexKey} from "../helpers/s3";
export const scan = async(contractAddress, chainId = 1) => {
    
    const result = await getTransaction(contractAddress, 'asc', chainId);
    if (result && result.from)
    {
        
        const [list, verified] = await Promise.all([
           // getTransaction(from, 'desc'),
            get(getS3DataKey(chainId)),
            verifyContract(contractAddress, chainId)
        ])
        const fundedByTC = list ? list[result.from] ? true : false : false;
        return [result.from, verified ,fundedByTC]
    }
    return [null, false, false]
}

export const computeRiskLevel = (data) =>{
    if(data.fundedByTC)
    {
        if(data.nonce && parseInt(data.nonce) > appConfig.nonceLevel)
        {
            return LEVELS.YELLOW
        }
        else
        {
            return LEVELS.RED
        }
    }
    return LEVELS.GREEN
    
}

export const importInitData = async(address, topic) => {
    let list = await get(getS3DataKey()) || {}
    let index = await get(getS3IndexKey()) || {}
    let lastIndex = index[address] || 1
    if (appConfig.initScan === '1')
    {
        console.log(`Start scanning for ${address} from block# ${lastIndex}`)
        const [result, lastpage] = await importDataFromLogsRecursivly(address, topic, lastIndex, list)
        index[address] = lastpage
        await write(index, getS3IndexKey())
        console.log(`Updated record for ${address} is ${Object.keys(result).length}`)
        console.log(`Last index for ${address} is ${lastpage}`)
    }
}

export const importDataFromLogsRecursivly = async(address, topic, nextPage,  list) => {
    let data = await getDataFromLogs(address, topic, nextPage, 'latest',process.env.CHAIN_ID)
    if(data.length > 0)
    {
        list = buildData(data, list, address)
        await write(list, getS3DataKey())
        nextPage =  parseInt(data[data.length-1]['blockNumber'], 16) + 1;
        if(data.length == MAX_COUNT )
        {
            console.log(`Next page for ${address} scanning is ${nextPage}`)
            const [result, lastpage] = await importDataFromLogsRecursivly(address, topic, nextPage, list)
            list = result
            nextPage = lastpage
        }
    }
    return [list, nextPage]
}

const buildData = (data, list, address) => {
    data.forEach((c) => {
        const addr = extractAddFromTCWithDrawLog(c.data)
        if (list[addr] === undefined)
        {
            list[addr] = {}
        }
        list[addr] = 1
    })
    return list
}

