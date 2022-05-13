import {tornadoSubscription} from './tornadoSubscription'
import config from '../config/app'
import etherScanConfig from '../config/etherScan'

export const initTornadoCash = () => {
    const tornadoCash1 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.address['1'])
    const tornadoCash10 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.address['10'])
    const tornadoCash100 = tornadoSubscription(config.provider, etherScanConfig.tornadoCash.address['100'])
}