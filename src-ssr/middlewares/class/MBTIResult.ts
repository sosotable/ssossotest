// MARK: mbti 결과 처리

import Result from './interface/Result';

const resultModels = require('../model/result');

export default class MBTIResult extends Result {
  MBTIPOINT: {
    [key: string]: number | string;
  } = {
    ESTJ: 0,
    ISTJ: 1,
    ENTJ: 2,
    INTJ: 3,
    ESFJ: 4,
    ISFJ: 5,
    ENFJ: 6,
    INFJ: 7,
    ESTP: 8,
    ISTP: 9,
    ENTP: 10,
    INTP: 11,
    ESFP: 12,
    ISFP: 13,
    ENFP: 14,
    INFP: 15,
  };
  mbti: number | string | null = '';
  constructor(
    _answerResult: {
      [type: string]: number | string;
      [score: number]: number | string;
    }[]
  ) {
    super(_answerResult);
  }
  // MARK: point값 계산
  calcMBTI(result: { [key: string]: number | string }[]) {
    for (let i = 0; i < result.length; i++) {
      let returnValue: [
        eipoint: number,
        snpoint: number,
        ftpoint: number,
        pjpoint: number
      ] = [0, 0, 0, 0];
      for (let i = 0; i < result.length; i++) {
        switch (result[i].type) {
          case 'EI':
            returnValue[0] += <number>result[i].score;
            break;
          case 'SN':
            returnValue[1] += <number>result[i].score;
            break;
          case 'FT':
            returnValue[2] += <number>result[i].score;
            break;
          case 'PJ':
            returnValue[3] += <number>result[i].score;
            break;
        }
      }
      return returnValue;
    }
  }
  setType() {
    const calcMBTIResult:
      | string
      | String
      | [eipoint: number, snpoint: number, ftpoint: number, pjpoint: number]
      | undefined = this.calcMBTI(this.answerResult);
    if (calcMBTIResult !== undefined) {
      // MARK: MBTI값(문자열) 을 지정합니다
      this.type.push(
        (calcMBTIResult[0] < 5 ? 'E' : 'I') + // eipoint
          (calcMBTIResult[1] < 5 ? 'S' : 'N') + // snpoint
          (calcMBTIResult[2] < 5 ? 'F' : 'T') + // ftpoint
          (calcMBTIResult[3] < 5 ? 'P' : 'J') // pjpoint
      );
    } else {
      return null;
    }
  }
  setMBTI() {
    // MARK: 계산된 mbti 속성값을 이용해 mbti point를 계산합니다
    this.mbti = this.MBTIPOINT[this.type[0]];
  }
  factory() {
    /**MARK
     * template method 패턴 통해서 메서드 하나로 일괄처리
     */
    // MARK: mbti값(문자열) 지정
    this.setType();
    // MARK: mbti point 계산
    this.setMBTI();
  }
}
