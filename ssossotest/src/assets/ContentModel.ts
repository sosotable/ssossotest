import {MBTIContentModel} from 'components/models';

export const mbtiModel: MBTIContentModel[] = [
  {
    id: 0,
    question: [
      '드디어 내일이 개강날이네!',
      '나름 파티인데 옷 좀 신경 써서 입고 갈까?',
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "피곤하니까 일단 자고 내일 생각해야지 히히", score: 1 },
      {
        answer:
          "(날씨를 미리 검색해본 후) 내일 날씨가 조금 쌀쌀하네? 이거랑 이거 입고 가야겠다.",
        score: 2,
      },
    ],
    type: "PJ",
    result: -1
  },
  {
    id: 1,
    question: [
      '두구두구~ 대망의 개강날!',
      '무슨 생각 하고 있어?',
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
      ],
    answer: [
      { answer: "하암 피곤해… 점심 뭐 먹지?", score: 1 },
      {
        answer:
          "친구들과 만나면 무슨 얘기를 할 지, 교수님이 진도를 나가실지 상상한다.",
        score: 2,
      },
    ],
    type: "SN",
    result: -1,
  },
  {
    id: 2,
    question: [
      '수업에 들어가기 전 과방에 들렀어!',
      '오랜만에 보는 동기들이 있네.',
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      {
        answer: "헉 얘들아 오랜만이야~! 다들 방학 동안 뭐하고 지냈어?!",
        score: 1,
      },
      { answer: "(먼저 와서 말 걸어줬으면 좋겠당… ㅎㅎ)", score: 2 },
    ],
    type: "EI",
    result: -1,
  },
  {
    id: 3,
    question: [
      "학과 행사로 개강파티가 열린다고 하네.",
      "단톡방에 필참하라는 과대의 톡이 올라왔어",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      {
        answer: "새로운 사람 많이 사귈 수 있겠다! 벌써부터 신난다.",
        score: 1,
      },
      { answer: "어색한 사람도 많을텐데! 벌써부터 걱정이 된다.", score: 2 },
    ],
    type: "EI",
    result: -1,
  },
  {
    id: 4,
    question: [
      "수업이 시작 했는데 친구가 오지 않아...",
      "결국 지각한 친구가 오다가 사고가 났다고 말해줬어.",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "헉 어떡해 많이 놀랐겠다…  괜찮아? ", score: 1 },
      { answer: "사고가 왜 났어? 너가 냈어? 보험은??", score: 2 },
    ],
    type: "FT",
    result: -1,
  },
  {
    id: 5,
    question: [
      "친구가 방학 동안 자격증을 땄다고 해!",
      "무슨 반응을 보여줘야 할까?",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "축하해~ 고생 많았겠다~", score: 1 },
      { answer: "오 축하해! 무슨 자격증 땄어?", score: 2 },
    ],
    type: "FT",
    result: -1,
  },
  {
    id: 6,
    question: [
      "강의를 듣는 중...",
      "오티 주인데도 교수님이 과제를 내 주셨어...",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      {
        answer:
          "아 하기 싫어… 근데 다음 주 수업 전까지만 끝내면 되는 거 아니야? 일단 놀자~",
        score: 1,
      },
      {
        answer:
          "으 무슨 오티 주부터 과제야… 오늘은 개강파티니까 내일 바로 끝내버려야겠다.",
        score: 2,
      },
    ],
    type: "PJ",
    result: -1,
  },
  {
    id: 7,
    question: [
      "친구와 점심 약속을 잡았어!",
      "나는?",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "뭐 먹지? 맛있는 거 먹어야겠다~", score: 1 },
      {
        answer: "뭐 먹지? A식당은 맛있지만 가격이 비싸고 B식당은 …",
        score: 2,
      },
    ],
    type: "PJ",
    result: -1,
  },
  {
    id: 8,
    question: [
      "수업 끝~! 점심시간이다!",
      "친구들과 식당에 갔는데 사장님이 우리를 알아보시고 오랜만이라며 서비스를 주셨어.",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "서비스 개이득! 잘 먹겠습니다~", score: 1 },
      {
        answer:
          "헉 우리를 기억해주시다니..! 감동이야🥺 근데 어떻게 알아보셨지? 기억을 더듬으며 생각해본다.2",
        score: 2,
      },
    ],
    type: "SN",
    result: -1,
  },
  {
    id: 9,
    question: [
      "개강 파티에 왔어!",
      "친한 동기들이 저기 모여있네?",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "새로운 친구들이 있는 곳에 슬쩍 낀다.", score: 1 },
      { answer: "거기로 가서 같이 논다.", score: 2 },
    ],
    type: "EI",
    result: -1,
  },
  {
    id: 10,
    question: [
      "갑자기 정전이 일어났어!",
      "나는?",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      { answer: "정전났네? 언제 복구되려나. 별 생각 없다.", score: 1 },
      {
        answer:
          "무슨 일이지? 누가 실수로 스위치를 껐나? 괴한이 나타난 건 아니겠지?  별의 별 상상을 다 해본다.",
        score: 2,
      },
    ],
    type: "SN",
    result: -1,
  },
  {
    id: 11,
    question: [
      "그 때 친구가 속이 너무 안 좋다고 하네",
      "토할 것 같다고?!",
      'https://i.pinimg.com/564x/07/3f/97/073f970c5b97bd0218c7eea7c5064b2b.jpg'
    ],
    answer: [
      {
        answer:
          "어떡해 너무 많이 마셨나보다 ㅠㅠ 밖에 나가서 바람 좀 쐴래?",
        score: 1,
      },
      {
        answer:
          "으이구 그러니까 내가 조절해서 마시랬지! 숙취해소제라도 사다줄까?",
        score: 2,
      },
    ],
    type: "FT",
    result: -1,
  },
]
