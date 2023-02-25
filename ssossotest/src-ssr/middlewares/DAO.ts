import { ssrMiddleware } from 'quasar/wrappers'
import {Request, Response} from "express";

/** FIXME:
 * 미들웨어 처리에 대한 이해가 미숙해서 DAO미들웨어 하나로 class 제작, config 처리를 함
 * 이후 클래스, config 외부화 필요
 * */
import mysql, { RowDataPacket, FieldPacket, Pool } from "mysql2/promise";

interface Post extends RowDataPacket {
  id: number;
  title: string;
  content: string;
}

class DAO {
  // MARK: singleton
  /**FIXME: node.js에서의 싱글톤 필요성?
   * 필요시 일반 클래스로 REFACTOR
   * */
  static DAOInstance: DAO;
  static connection: Pool;
  constructor() {
    // MARK: 싱글톤 객체 지정
    if (!DAO.DAOInstance) {
      DAO.DAOInstance = this;
    }
  }

  // MARK: DB 연결 설립과 해제
  async init(host: string, port: string, user: string, password: string, database: string) {
    // @ts-ignore
    DAO.connection = await mysql.createPool({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    });
  }
  async end() {
    await DAO.connection.end();
  }
  getInstance() {
    return DAO.DAOInstance;
  }
  async insert(table: String, columns: String | undefined, values: String) {
    try {
      /** MARK:
       *  colmumns 가 undefined 키워드 즉 입력되지 않은 경우 생략하고 모든 열에 입력됨
       * */
      if (columns === undefined) {
        await DAO.connection.query(
          `INSERT INTO ` + `${table} ` + `VALUES(${values})`
        );
      } else {
        await DAO.connection.query(
          `INSERT INTO ` + `${table}(${columns}) ` + `VALUES(${values})`
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
  async select(columns: String, table: String, where?: String) {
    try {
      /** MARK:
       *  where 매개변수를 입력하지 않는 경우 모든 열 검색
       * */
      if (where === undefined) {
        const [rows, fields]: [Post[], FieldPacket[]] =
          await DAO.connection.query(
            `SELECT ` + `${columns} ` + `FROM ` + `${table}`
          );
        return rows;
      } else {
        const [rows, fields]: [Post[], FieldPacket[]] =
          await DAO.connection.query(
            `SELECT ` + `${columns} ` + `from ` + `${table} ` + `WHERE ${where}`
          );
        return rows;
      }
    } catch (e) {
      console.error(e);
    }
  }
  async update(table: String, set: String, where: String) {
    try {
      await DAO.connection.query(
        `UPDATE ` + `${table} ` + `SET ${set} ` + `WHERE ${where}`
      );
    } catch (e) {
      console.error(e);
    }
  }
  async delete(table: String, where: String) {
    try {
      await DAO.connection.query(
        `DELETE ` + `FROM ` + `${table} ` + `WHERE ${where}`
      );
    } catch (e) {
      console.error(e);
    }
  }
}
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(async ({ app , resolve/*, publicPath, render */ }) => {

  // MARK: absolute build path
  require('dotenv').config({
    path: 'C:\\Users\\valtin\\Desktop\\project\\ssossotest\\ssossotest\\.env'
  })
  const dao = new DAO()
  if(process.env.DB_ENDPOINT != undefined &&
    process.env.DB_PORT != undefined &&
    process.env.DB_USER != undefined &&
    process.env.DB_PASSWORD != undefined &&
    process.env.DB_DATABASE != undefined) {
    await dao.init(
      process.env.DB_ENDPOINT,
      process.env.DB_PORT,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      process.env.DB_DATABASE)
  }

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
