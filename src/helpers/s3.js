import s3Config from "../config/s3";
export const getS3DataKey = (chainId) => {
    if (chainId)
    {
        return s3Config.network[chainId].key
    }
    return s3Config.network[process.env.CHAIN_ID].key
}

export const getS3IndexKey = (chainId) => {
    if (chainId)
    {
        return s3Config.network[chainId].indexKey
    }
    return s3Config.network[process.env.CHAIN_ID].indexKey
}