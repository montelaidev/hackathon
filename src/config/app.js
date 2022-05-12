require('dotenv').config();
export default {
  port: process.env.PORT || 9000,
  initScan: process.env.INIT_DATA || '0'
}
  