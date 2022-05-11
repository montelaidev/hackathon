require('dotenv').config();
export default {
    app: {
      port: process.env.PORT || 9000,
      provider: process.env.PROVIDER || "ws://localhost:8546"
    },
    tornadoCash: {
        address: {
            '1':'0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936',
            '10':'0x910cbd523d972eb0a6f4cae4618ad62622b39dbf',
            '100':'0xA160cdAB225685dA1d56aa342Ad8841c3b53f291'
        }
    },
  }
  