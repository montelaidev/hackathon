import { ethers } from 'ethers';
import tornadoAbi from '../abi/tornadoReceipt.json'
import { get, put } from '../s3';

export const tornadoSubscription = (wsHost, tornadoReceiptType) => {
    const provider = new ethers.providers.WebSocketProvider(wsHost)

    let contract = new ethers.Contract(tornadoReceiptType, tornadoAbi, provider);
    console.log(`Subscription connected ${tornadoReceiptType}`)

    contract.on("*", async (data) => {
        console.debug("event: ", data);
        // Func Sig: 0xb438689f
        // Args Withdrawal (address to, bytes32 nullifierHash, index_topic_1 address relayer, uint256 fee)
        const [to, nullifierHash, relayerAddr] = data.args; 
        const fundedAccountData = {
          txHash: data.transactionHash,
          block: data.blockNumber,
          tornadoAddr: tornadoReceiptType
        }
        await put(to, 'tornado', fundedAccountData)
      });
}
