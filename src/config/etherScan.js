require('dotenv').config();
export default {
    apiKey: process.env.ETHERSCAN_KEY,
    uri: process.env.ETHERSCAN_URI || 'https://api.etherscan.io/api',
    tornadoCash: {
      withDrawTopic: '0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931',
      address: 
          {'1':'0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936',
          '10':'0x910cbd523d972eb0a6f4cae4618ad62622b39dbf',
          '100':'0xA160cdAB225685dA1d56aa342Ad8841c3b53f291'}
     
    },
  }
  