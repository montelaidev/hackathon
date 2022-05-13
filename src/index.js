import express from "express";
import appConfig from "./config/app";
import morganBody from "morgan-body";
import * as ScanService from './services/scan'

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
      const [deployerAddress, contractVerified, fundedByTC] = await ScanService.scan(address)

      if(!deployerAddress)
      {
        res.status(404);
        return res.json({
          success: false,
          data: null,
          error: 'Contract Address not found'
        });
      }

      return res.json({
        success: true,
        data: {
          hasRisk: !contractVerified,
          fundedByMixer: fundedByTC
        }
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


app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}.`);
});

