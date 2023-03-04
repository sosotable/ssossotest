module.exports = (() => {
  return {
    mbtiRestList: [
      {
        name: "텐동",
        type: 'ESTJ',
        desc: [
            "- 고집이 세고, 현실적이고, 이성적이고, 직설적이예요.",
            "- 리더 맡는 거 싫어하는데 막상 하면 잘 해요.",
            "- 일처리 못하는 게 세상에서 제일 싫어요.",
            "- 목표를 설정 해놓고 그 목표를 이룰 때까지 한 우물만 파요. 모든 게 제자리에 있어야 하고 내 계획이 절대 틀어지면 안 돼요."]
      },
      {
        name: "샌드위치",
        type: 'ISTJ',
        desc: [
            "- 즉흥적인 걸 싫어하고 약속 어기는 것도 싫어해요.",
            "- 그냥 나 혼자 하는 게 제일 편하고 제일 빠르다고 생각해요. 누가 도와준다고 해도 혼자 할 수 있을 것 같으면 혼자 해요.",
            "- 내 일이랑 의견에 간섭 받는 걸 싫어해요.",
            "- 일 하는 중에 이야기가 다른 곳으로 새는 게 싫어요. 시작했으면 목표한 걸 끝내야 속이 시원해요."]
      },
      {
        name: "스테이크",
        type: 'ENTJ',
        desc: [
            "- 누구한테 의존하거나 의지하는 스타일이 아니에요. 세상에 믿을 사람은 나 하나에요.",
            "- 남이 나한테 이래라 저래라 하는 걸 싫어해요. 냉철할 땐 끝도 없이 냉철해요.",
            "- 머릿속에서 시뮬레이션을 미리 돌려보고 해결책을 찾아가는 편이에요.",
            "- 사람 많을 땐 프로페셔널하지만 혼자 있을 땐 몽상가가 돼요."]
      },
      {
        name: "타코야끼",
        type: 'INTJ',
        desc: [
            "- 혼자 있는 걸 좋아해요. 그런데 단체활동 할 때 주도적인 역할을 자주 맡아요.",
            "- 하루하루 세세하게 계획 짜 놓고 지내는 것을 좋아해요.",
            "- 돈 관리도 잘하는 편이에요.",
            "- 특이하고 특별한데 남에게 그런 소리 듣는 건 싫어요."]
      },
      {
        name: "곱도리탕",
        type: 'ESFJ',
        desc: [
            "- 혼자 계획 세우는 걸 좋아하고 그 계획이 틀어지는 걸 극도로 싫어해요.",
            "- 은근 책 읽고 영화 보는 걸 좋아해요.",
            "- 인간관계에서 상처 받아도 그 사람 배려하느라 얘기를 못 해요.",
            "- 내 사람들을 정말 잘 챙겨요. 상담해주고 고민 들어주는 걸 좋아해요."]
      },
      {
        name: "오믈렛",
        type: 'ISFJ',
        desc: [
            "- 아싸 무리에서는 인싸, 인싸 무리에서는 아싸예요.",
            "- 남이 볼 땐 인생 노잼 처럼 보이지만 자기 선에선 매우 만족하며 살아요.",
            "- 배려심이 많고 공감을 잘 해줘요. 남에게 너무 잘해주다 인간관계에서 스트레스를 많이 받아요.",
            "- 겉으로는 덤덤해 보여도 속으로는 온갖 생각 다 해요."]
      },
      {
        name: "떡볶이",
        type: 'ENFJ',
        desc: [
            "- 사람들을 이끄는 것에 타고난 기질이 있고, 좋아하기도 해요.",
            "- 무리에 속해있는 것도 좋지만 은근 마이웨이 기질이 있어요.",
            "- 많은 사람들의 신뢰를 받는 성격이에요. 사람들에게 잘 맞춰요.",
            "- 객관적, 직관적이고 내가 나 스스로를 잘 알기에 관심사가 많은 편이에요. 그래서 꿈도 여러개예요."]
      },
      {
        name: "꿔바로우",
        type: 'INFJ',
        desc: [
            "- 겉으로는 웃는데 속으론 욕 많이 해요.",
            "- 집순이인데 여행 가는 건 좋아해요.",
            "- 친해지고 싶은 사람이 있어도 그 사람이 먼저 다가와줬으면 바래요.",
            "- 조용히 다니는데 가끔 좀 튀고 싶을 때가 있어요."]
      },
      {
        name: "로제파스타",
        type: 'ESTP',
        desc: [
            "- 밖에서 사람 만나는 거 좋아하지만 게을러서 나가기까지 과정이 너무 귀찮아요.",
            "- 외로움을 잘 타요. 그만큼 표현도 많이 해요.",
            "- 스트레스를 잘 받는 편이 아니에요. 그렇게 적극적인 편도 아니어서 그냥 사는 대로 잘 살아요.",
            "- 모임에서 어느새 내가 분위기를 주도하고 있어요."]
      },
      {
        name: "스모어쿠키",
        type: 'ISTP',
        desc: [
            "- 만사가 귀찮아요. 남한테 관심 없고 내 얘기도 잘 안 해요.",
            "- 미루고 미뤄요. 발등에 불이 떨어져도 안 하다가 발등이 타기 시작하면 그제야 시작해요.",
            "- 내가 질릴 때까지 관심있고 하고 싶은 것만 해요. 하기 싫은 건 죽어도 안 해요.",
            "- 노력을 절약하고 싶어해요. 효율적인 게 제일 좋아요."]
      },
      {
        name: "마라탕",
        type: 'ENTP',
        desc: [
            "- 나한테 잘해주는 사람한테는 두 배로 잘해줘요. 하지만 나한테 못해주면 국물도 없어요.",
            "- 직설적이고 솔직하게 내 맘을 표현하는 것에 거리낌이 없어요.",
            "- 지나간 일에 후회가 별로 없는 편이에요. 그래서 힘든 일이 있어도 빨리 털어내는 편이에요.",
            "- 다방면에 적당한 재능이 있어요. 잘하는 건 많은데, 엄청 잘하진 않아요."]
      },
      {
        name: "버블티",
        type: 'INTP',
        desc: [
            "- 자발적 아웃사이더예요. 혼자 있는 게 제일 편하고 행복해요.",
            "- 책 진짜 좋아하는데 읽기 귀찮아서 메모장에만 적어놔요.",
            "- 누구한테 내 감정을 잘 표현하지 않아요. 속으로 묵혀두지만"]
      },
      {
        name: "연어초밥",
        type: 'ESFP',
        desc: [
            "- 성격이 매우 매우 급해요.",
            "- 우주 최강의 오지랖을 가지고 있어요.",
            "- 혼자 있으면 지루해서 뭔가를 계속 하고 있어야 해요.",
            "- 사람의 단점보다는 장점을 보려고 해요. 싸움보다는 평화가 좋아요."]
      },
      {
        name: "붕어빵",
        type: 'ISFP',
        desc: [
            "- 감정 기복이 심하고 공감 능력이 좋아요.",
            "- 집순이 집돌이예요. 집에 가면 연락 두절돼요.",
            "- 분석, 비판, 판단은 잘 하는데 이런 판단을 적극적으로 행동에 옮기지는 않아요.",
            "- 한 번 맡은 일은 끝까지 해야한다는 책임감이 있어요. 근데 하다가 잠들어요."]
      },
      {
        name: "고구마치즈돈까스",
        type: 'ENFP',
        desc: [
            "- 남 얘기에 반응을 잘 해줘서 고민상담하는 친구들이 많아요.",
            "- 사람이 너무 좋아요. 새로운 친구 사귀는 게 재밌어요.",
            "- 감정기복이 심한데 그 감정이 얼굴에 다 드러나는 편이에요.",
            "- 하루에 행복한 일 하나씩 정해놓고 설레어해요."]
      },
      {
        name: "수플레 펜케이크",
        type: 'INFP',
        desc: [
            "- 일을 완벽하게 하지 못할 거면 아예 시작을 안 해요.",
            "- 인간관계에 예민해요. 낯을 심하게 가리고 사람 사귈 때 이것저것 따져요.",
            "- 남이 나를 어떻게 생각할지 고민을 많이 해요. 그래서 눈치도 많이 봐요.",
            "- 겉으로는 얘기를 잘 들어주는 것 같지만 사실 속으로는 딴 생각 중이예요."]
      },
    ],
  };
})();
