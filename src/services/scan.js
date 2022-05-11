import {getDeployer, getInternalTransaction} from '../etherScan'
import {get, put} from "../s3";
import config from "../config/app";
export const scan = async(contractAddress) => {

    const deployer = await getDeployer(contractAddress);

    const data = {}

    if (deployer)
    {
        const {from, nonce} = deployer
        const list = await get('/scan')
        if(list[from])
        {
            //Updated nonce of the deployer address
           const result = await put(from, '/scan', {nonce}, list)
           
        }else{
            let list = await getInternalTransaction(from);
  
            const checklist = Object.values(config.tornadoCash);
            
            let flagRed = false
            
            list.forEach(e => {
                if(checklist.includes(e.from))
               {
                    flagRed = true
               }
            });
            list = undefined;
            global.gc();
        }
        
        return null
    }
    return null
}

const hasTo