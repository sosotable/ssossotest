import { AverageContentModel } from 'components/models';

export const averageModel: AverageContentModel[] = [
  {
    id: 0,
    question: '주량(소주기준) ',
    answer: [
      {
        pMin: 0,
        pMax: 10,
        pStep: 0.5,
        unit: '병',
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 1,
    question: '맵기 단계',
    answer: [
      { answer: '1단계: 못 먹음', score: 0 },
      { answer: '2단계: 진라면 순한맛', score: 1 },
      { answer: '3단계: 신라면', score: 2 },
      { answer: '4단계: 불닭', score: 3 },
      { answer: '5단계: 그 이상', score: 4 },
    ],
    type: 'button',
    result: -1,
  },
  {
    id: 2,
    question: '신 맛 단계',
    answer: [
      { answer: '1단계: 못 먹음', score: 0 },
      { answer: '2단계: 새콤달콤', score: 1 },
      { answer: '3단계: 아이셔', score: 2 },
      { answer: '4단계: 패션후르츠', score: 3 },
      { answer: '5단계: 레몬', score: 4 },
    ],
    type: 'button',
    result: -1,
  },
  {
    id: 3,
    question: '하루에 커피 ',
    answer: [
      {
        pMin: 0,
        pMax: 5,
        pStep: 1,
        unit: '잔',
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 4,
    question: '피자 (라지 기준) ',
    answer: [
      {
        pMin: 0,
        pMax: 10,
        pStep: 1,
        unit: '조각',
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 5,
    question: '붕어빵 한자리에서 ',
    answer: [
      {
        pMin: 0,
        pMax: 20,
        pStep: 1,
        unit: '개',
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 6,
    question: '하루 ',
    answer: [
      {
        pMin: 0,
        pMax: 5,
        pStep: 1,
        unit: '끼',
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 7,
    question: '일주일에 외식/배달음식 ',
    answer: [
      {
        pMin: 0,
        pMax: 20,
        pStep: 1,
        unit: '번',
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 8,
    question: '팥붕 vs 슈붕',
    answer: [
      { answer: '팥붕', score: 0 },
      { answer: '슈붕', score: 1 },
    ],
    type: 'button',
    result: -1,
  },
  {
    id: 9,
    question: '물냉 vs 비냉',
    answer: [
      { answer: '물냉', score: 0 },
      { answer: '비냉', score: 1 },
    ],
    type: 'button',
    result: -1,
  },
  {
    id: 10,
    question: '민초 vs 반민초',
    answer: [
      { answer: '민초', score: 0 },
      { answer: '반민초', score: 1 },
    ],
    type: 'button',
    result: -1,
  },
];
