require('dotenv').config();
export default {
    apiKey: process.env.ETHERSCAN_KEY,
    uri: {
      network: {
        1: 'https://api.etherscan.io/api',
        5: 'https://api-goerli.etherscan.io/api',
      }
    },
    tornadoCash: {
      withDrawTopic: '0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931',
      network: {
        1: {
            '0_1': '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc',
            '1':'0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936',
            '10':'0x910cbd523d972eb0a6f4cae4618ad62622b39dbf',
            '100':'0xA160cdAB225685dA1d56aa342Ad8841c3b53f291'
          }
,
        5: {
            '0_1': '0x6Bf694a291DF3FeC1f7e69701E3ab6c592435Ae7',
            '1':'0x3aac1cC67c2ec5Db4eA850957b967Ba153aD6279',
            '10':'0x723B78e67497E85279CB204544566F4dC5d2acA0',
            '100':'0x723B78e67497E85279CB204544566F4dC5d2acA0'
        }
      }
    },
    provider: process.env.PROVIDER
  }
  