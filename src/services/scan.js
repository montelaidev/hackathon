import {getDeployer} from '../etherScan'
import {get, put} from "../s3";

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
            
        }
        
        return null
    }
    return null
}

