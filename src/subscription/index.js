import {tornadoSubscription} from './tornadoSubscription'
import config from '../config/etherscan'

export const initTornadoCash = () => {
    const tornadoCash1 = tornadoSubscription(config.app.provider, config.tornadoCash.address['1'])
    const tornadoCash10 = tornadoSubscription(config.app.provider, config.tornadoCash.address['10'])
    const tornadoCash100 = tornadoSubscription(config.app.provider, config.tornadoCash.address['100'])
}