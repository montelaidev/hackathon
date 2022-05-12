
import { ethers } from "ethers"
import { verifyToken } from "./verifyToken"
import uniswapLPABI from "../abi/uniswapV2.json"
import IERC20ABI from "../abi/ierc20.json"
import { LEVELS } from "../constants/levels"

// If the pool contains a well known token symbol. This function will check the token with the address to see if it really is that token
export const verifyPool = (provider, poolAddress, protocol) => {
    const liquidityPool = new ethers.Contract(poolAddress, uniswapLPABI, provider)
    const token0Addr = await liquidityPool.token0()
    const token1Addr = await liquidityPool.token1()
    const token0 = new ethers.Contract(token0Addr, IERC20ABI, provider)
    const token1 = new ethers.Contract(token1Addr, IERC20ABI, provider)

    const token0Symbol = await token0.symbol()
    const token1Symbol = await token1.symbol()

    const [level0] = verifyToken(token0Addr, token0Symbol)
    const [level1] = verifyToken(token1Addr, token1Symbol)

    if (level0 == 2 || level1 == 2){
        return [LEVELS.RED, "one token symbol does not match its known address"]
    } else if (level0 == 1 || level1 == 1){
        return [LEVELS.YELLOW, "one token of the pair is unknown"]
    } 

    return [LEVELS.GREEN, "known pair"];
}
