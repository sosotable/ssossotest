import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();

const DAO = require("../libs/dao/DAO");

/* GET home page. */
router.post(
  "/:method",
  async (req: Request, res: Response, next: NextFunction) => {
    const method = req.params.method;
    switch (method) {
      case "register":
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        await DAO.insert(
          "user",
          "`key`,user_id",
          `'${ip}', '${req.body.user_id}'`
        );
        break;
    }
    res.render("index", { title: "Express" });
  }
);

module.exports = router;
