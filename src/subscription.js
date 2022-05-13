import express from "express";
import ethScanConfig from "./config/etherscan";
import appConfig from "./config/app";
import morganBody from "morgan-body";
import * as ScanService from './services/scan'
import { initTornadoCash } from "./subscription/index.js";

const app = express();
app.use(express.json());
// app.use(cors({
//   origin: '*'
// }));
morganBody(app);


Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.network[process.env.CHAIN_ID]['0_1'], ethScanConfig.tornadoCash.withDrawTopic)]
).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.network[process.env.CHAIN_ID]['1'], ethScanConfig.tornadoCash.withDrawTopic)]
)).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.network[process.env.CHAIN_ID]['10'], ethScanConfig.tornadoCash.withDrawTopic)]
)).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.network[process.env.CHAIN_ID]['100'], ethScanConfig.tornadoCash.withDrawTopic)]
))
.then(() => {
  initTornadoCash()
  app.listen(appConfig.port, () => {
    console.log(`Server is running on port ${appConfig.port}.`);
  });
  
}
).catch(err => {
    console.log(`Init error.`, err);
});

