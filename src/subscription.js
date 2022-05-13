import express from "express";
import ethScanConfig from "./config/etherscan";
import morganBody from "morgan-body";
import * as ScanService from './services/scan'
import { initTornadoCash } from "./subscription";

const app = express();
app.use(express.json());
// app.use(cors({
//   origin: '*'
// }));
morganBody(app);


Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.address['1'], ethScanConfig.tornadoCash.withDrawTopic)]
).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.address['10'], ethScanConfig.tornadoCash.withDrawTopic)]
)).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.address['100'], ethScanConfig.tornadoCash.withDrawTopic)]
))
.then(() => {
  initTornadoCash()
}
).catch(err => {
    console.log(`Init error.`, err);
});
