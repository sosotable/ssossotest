import Result from "./interface/Result";

const contentModels = require("../model/content");
const averageModels = contentModels.average;

export default class AverageResult extends Result {
  constructor(
    _answerResult: {
      [type: string]: number | string;
      [score: number]: number | string;
    }[]
  ) {
    super(_answerResult);
  }

  setTitle() {
    for (let i = 0; i < averageModels.length; i++) {
      this.resultTitle[i] = averageModels.average[i].q;
    }
  }

  setDesc() {
    for (let i = 0; i < averageModels.length; i++) {
      let score = Number(averageModels[i].score);
      if (averageModels[i].a == undefined) {
        this.resultDesc[i] = score + "";
      } else {
        this.resultDesc[i] = averageModels[i].a[score].answer;
      }
    }
  }

  setDescBuffer() {
    for (let i = 0; i < averageModels.length; i++) {
      let score = Number(averageModels[i].score);
      if (averageModels[i].a == undefined) {
        this.resultDesc[i] = score + "";
      } else {
        this.resultDesc[i] = averageModels[i].a[score].answer;
      }
    }
  }

  factory() {
    this.setTitle();
    this.setDesc();
    this.setDescBuffer();
  }
}
