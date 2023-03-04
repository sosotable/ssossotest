/** MARL: DAO 미들웨어
 * **/

import { ssrMiddleware } from 'quasar/wrappers'
import {Request, Response} from "express";
import DAO from './libs/dao/DAO'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(async ({ app , resolve/*, publicPath, render */ }) => {
  // MARK: absolute build path
  require('dotenv').config({
    path: 'C:\\Users\\valtin\\Desktop\\project\\ssossotest\\ssossotest\\.env'
  })
  const dao = new DAO()
  await dao.init()
  // something to do with the server "app"
  app.post(resolve.urlPath('/DAO/:DML'), async (req: Request, res: Response) => {
    const DML = req.params.DML.toUpperCase();
    const body = req.body;
    try {
      let returnValue: Array<{}> | any = [];
      switch (DML) {
        case "INSERT":
          await dao.insert(body.table, body.columns, body.values);
          break;
        case "SELECT":
          returnValue = await dao.select(body.columns, body.table, body.where);
          break;
        case "UPDATE":
          await dao.update(body.table, body.set, body.where);
          break;
        case "DELETE":
          await dao.delete(body.table, body.where);
          break;
      }
      res.send(returnValue);
    }
    catch (e) {
      res.send(e)
    }
  })
})
