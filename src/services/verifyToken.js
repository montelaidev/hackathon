import cleanedList from '../constants/cleanedList.json'
import {LEVELS} from '../constants/levels'

export const verifyToken = (contractAddress, tokenSymbol) => {
    // unknown token to CMC
    if (!cleanedList[contractAddress]) return [LEVELS.YELLOW, 'unknown contract']
    
    // Cases:
    // 1. contract address doesn't match symbol <-- low probability 
    // 2. symbol doesn't match contract address <-- high risk

    if (cleanedList[contractAddress].symbol !== tokenSymbol) return [LEVELS.RED, 'mismatch']
    
    const potentialSymbolMatches = Object.entries(cleanedList).filter(([key, value]) => value.symbol === tokenSymbol)
    if (potentialSymbolMatches.every(([key,value]) => value.address !== contractAddress)) {
        return [LEVELS.RED, 'mismatch']
    }
    
    return [LEVELS.GREEN, 'known contract and matches']
}