import express from "express";
import cors from "cors";
import appConfig from "./config/app";
import ethScanConfig from "./config/etherScan";
import morganBody from "morgan-body";
import * as ScanService from './services/scan'
import { initTornadoCash } from "./subscription";

const app = express();
app.use(express.json());
// app.use(cors({
//   origin: '*'
// }));
morganBody(app);

app.post("/scan", async (req, res) => {
    try{
      const {address} = req.body;
      if(!address)
      {
        res.status(400);
        return res.json({
          success: false,
          data: null,
          error: 'Address is required'
        });
      }
      const scanResult = await ScanService.scan(address)
      return res.json({
        success: true,
        data: scanResult
      });
    }catch(err)
    {
      res.status(500);
      return res.json({
        success: false,
        data: null,
        error: err.message
      });
    }
});

Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.address['1'], ethScanConfig.tornadoCash.withDrawTopic)]
).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.address['10'], ethScanConfig.tornadoCash.withDrawTopic)]
)).then(() => Promise.all(
  [ScanService.importInitData(ethScanConfig.tornadoCash.address['100'], ethScanConfig.tornadoCash.withDrawTopic)]
))
.then(() => {
 // initTornadoCash()
  app.listen(appConfig.port, () => {
    console.log(`Server is running on port ${appConfig.port}.`);
  });
}
).catch(err => {
    console.log(`Init error.`, err);
});

