import { ethers } from 'ethers';
import tornadoAbi from '../abi/tornadoReceipt.json'
import { put } from '../s3';
import s3Config from '../config/s3';
export const tornadoSubscription = (wsHost, tornadoReceiptType) => {
    const provider = new ethers.providers.WebSocketProvider(wsHost)

    let contract = new ethers.Contract(tornadoReceiptType, tornadoAbi, provider);
    console.log(`Subscription connected ${tornadoReceiptType}`)

    const withdrawFilter = contract.filters.Withdrawal(null,null,null,null)
    console.debug(withdrawFilter)

    contract.on(withdrawFilter, async (to, nullifierHash, relayer, fee) => {
        console.debug("event: ", to, nullifierHash, relayer, fee);
        // Func Sig: 0xb438689f
        // Args Withdrawal (address to, bytes32 nullifierHash, index_topic_1 address relayer, uint256 fee)
        await put(to, s3Config.key, 1)
      });
}
