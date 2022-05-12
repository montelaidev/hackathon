import express from "express";
import cors from "cors";
import path from "path";
import config from "./config/app";
import morganBody from "morgan-body";
import {get, put} from "./s3";
import {scan} from './services/scan'
import { initTornadoCash } from "./subscription";

initTornadoCash()
const app = express();
app.use(express.json());
morganBody(app);

app.post("/scan", async (req, res) => {
  const {address} = req.body;
  const data = await scan(address)
  
  // const s = await put(address, {
  //    fundByTornado: false, nonce: 31, level : 1
  // });

  // const data = await get();
  
  return res.json({
    success: true,
    data: data
  });
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}.`);
});