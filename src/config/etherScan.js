require('dotenv').config();
export default {
    apiKey: process.env.ETHERSCAN_KEY,
    uri: process.env.ETHERSCAN_URI || 'https://api.etherscan.io/api'
  }
  