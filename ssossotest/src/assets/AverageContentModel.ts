import { AverageContentModel } from 'components/models';

export const averageModel: AverageContentModel[] = [
  {
    id: 0,
    question: '주량(소주기준) n병',
    answer: [
      {
        pMin: 0,
        pMax: 10,
        pStep: 0.5,
      },
    ],
    type: 'range',
    result: -1,
  },
  {
    id: 1,
    question: '맵기 단계',
    answer: [
      { answer: '1단계: 못먹음', score: 0 },
      { answer: '2단계: 진라면 순한맛', score: 1 },
      { answer: '3단계: 신라면', score: 2 },
      { answer: '4단계: 불닭', score: 3 },
      { answer: '5단계: 그 이상', score: 4 },
    ],
    type: 'button',
    result: -1,
  },
];
