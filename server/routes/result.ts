import { RequestExtension } from "../interface/RequestExtension";
import { Response } from "express";

import MBTIResult from "../class/MBTIResult";
import TastesResult from "../class/TastesResult";
import AverageResult from "../class/AverageResult";

/** 결과 화면 **/
// @ts-ignore
const express = require("express");
// @ts-ignore
const router = express.Router();

// MARK: 다형성에 따라 result 객체 지정
let result: MBTIResult | TastesResult | AverageResult;

router
  .route("/:path")
  .get((req: RequestExtension, res: Response) => {
    res.redirect(202, "/");
  })
  .post(async (req: RequestExtension, res: Response) => {
    const path = req.params.path;
    // MARK: shared 쿼리스트링이 존재하는 경우 => 공유받아서 들어온 상태
    try {
      // MARK: 결과값 파싱
      switch (path) {
        /** MARK: path 값(mbti, tastes, average)에 따라 result 객체를 지정
         *  --Factory 패턴 사용하여 코드 간소화--
         *  Template method 패턴입니다(착각함)
         * */
        case "mbti":
          let answerResult: {
            [type: string]: number | string;
            [score: number]: number | string;
          }[] = [];
          // MARK: 결과 데이터 파싱: type과 score만을 뽑아내서 사용함
          req.body.forEach((element: any) => {
            answerResult.push({
              type: element.type,
              score: element.result,
            });
          });
          // MARK: 클래스를 통해 데이터 파싱
          result = new MBTIResult(answerResult);
          if (result instanceof MBTIResult) {
            result.factory();
          }
          // REFACTOR: 지금은 하나하나씩 send하는데 추후 나머지 구현 후 일괄적으로 처리 가능하도록 바꾸어야 할 것 같아요
          res.send({
            image: result.resultTitle,
            title: result.resultTitle,
            desc: result.resultDesc,
            type: result.type,
          });
          break;
        case "tastes":
          /** TODO: need to imple
           * **/
          // result = new TastesResult(resultBody, undefined);
          if (result instanceof TastesResult) {
            result.factory();
          }
          break;
        case "average":
          /** TODO: need to imple
           * **/
          // result = new AverageResult(resultBody);
          if (result instanceof AverageResult) {
            result.factory();
          }
          break;
      }
    } catch (e) {
      console.error(e);
    }
  });

module.exports = router;
