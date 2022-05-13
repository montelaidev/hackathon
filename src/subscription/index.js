import {tornadoSubscription} from './tornadoSubscription'
import config from '../config/app'
import etherScanConfig from '../config/etherscan'

export const initTornadoCash = () => {
    //main net
    const tornadoCash01 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.network[process.env.CHAIN_ID]['0_1'])
    const tornadoCash1 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.network[process.env.CHAIN_ID]['1'])
    const tornadoCash10 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.network[process.env.CHAIN_ID]['10'])
    const tornadoCash100 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.network[process.env.CHAIN_ID]['100'])

}