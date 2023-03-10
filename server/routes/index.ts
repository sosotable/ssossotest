import { NextFunction, Request, Response } from "express";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
