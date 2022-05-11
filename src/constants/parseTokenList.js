const tokenList = require('./cmcTokenList.json')
const fs = require('fs');

const formattedList = {}
for (i in tokenList.tokens) {
    const { chainId, address, name, symbol, decimal } = tokenList.tokens[i]
    formattedList[address] = tokenList.tokens[i]
}

fs.writeFileSync('cleanedList.json', JSON.stringify(formattedList));