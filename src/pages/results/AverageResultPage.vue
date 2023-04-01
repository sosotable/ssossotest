<template>
  <q-page class="row items-center justify-evenly absolute-top">
    <div class="row items-start">
      <q-card class="my-card" flat bordered>
        <q-card-section style="width: 300px">
          <div class="text-orange-9 text-center" style="height: 50px" />
          <div class="q-ma-lg text-center text-h6">
            <div v-if="this.userName">{{ this.userName }}님의 결과</div>
            <div v-else>당신의 결과</div>
            <div class="q-ma-lg">💌</div>
            <q-separator />
          </div>
          <div class="q-pa-none col">
            <q-list
              bordered
              separator
              v-for="(item, i) in this.averageModel"
              :key="i"
              style="margin-bottom: 30px; border-radius: 10px"
            >
              <q-item-section insert>
                <!-- 질문 -->
                <div class="question-div">
                  {{ item.question }}
                </div>

                <!-- 답변 -->
                <!-- 버튼 -->
                <div
                  v-if="item.type === 'button' && item.answer[resultList[i]]"
                  class="answer-div"
                >
                  <!-- 버튼: 맵기 & 신 맛 단계 -->
                  <div v-if="i === 1 || i === 2">
                    <div class="compare-div">
                      <div v-if="averageList[i] > resultList[i]">
                        <b>못</b> 먹는 편이군요!
                      </div>
                      <div v-else-if="averageList[i] < resultList[i]">
                        남들보다 <b>잘</b> 먹어요!
                      </div>
                      <div v-else><b>평균</b>이에요!</div>
                    </div>

                    <div class="my-answer-div">
                      <div class="title-div">나</div>
                      {{ item.answer[resultList[i]].answer }}
                    </div>

                    <div class="average-div">
                      <div class="title-div">평균</div>
                      {{ ((averageList[i]) + 1).toFixed(2) }}단계
                    </div>
                  </div>

                  <!-- 버튼 이지선다형 -->
                  <div v-else>
                    <div class="compare-div">
                      <div v-if="averageList[i]< 0.5">
                        <div v-if="resultList[i] === 0">
                          <b>과반수 이상</b>의 사람과 취향이 같아요!
                        </div>
                        <div v-else>
                          취향이 <b>마이너</b> 하군요!
                        </div>
                      </div>
                      <div v-else-if="averageList[i] > 0.5">
                        <div v-if="resultList[i] === 1">
                          <b>과반수 이상</b>의 사람과 취향이 같아요!
                        </div>
                        <div v-else>
                          취향이 <b>마이너</b> 하군요!
                        </div>
                      </div>
                      <div v-else>평균이에요!</div>
                    </div>

                    <div class="my-answer-div">
                      <div class="title-div">나</div>
                      {{ item.answer[resultList[i]].answer }}
                    </div>

                    <div class="average-div">
                      <div class="title-div">평균</div>
                      <div style="width: 90px">
                        {{ item.answer[0].answer }} :
                        {{ 100 - averageList[i].toFixed(2) * 100 }}%
                      </div>
                      <div>
                        {{ item.answer[1].answer }} :
                        {{ averageList[i].toFixed(2) * 100 }}%
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 숫자 답변 -->
                <div v-else class="answer-div">
                  <div class="compare-div">
                    <div v-if="averageList[i] > resultList[i]">
                      <b>못</b> 먹는 편이군요!
                    </div>
                    <div v-else-if="averageList[i] < resultList[i]">
                      남들보다 <b>잘</b> 먹어요!
                    </div>
                    <div v-else><b>평균</b>이에요!</div>
                  </div>

                  <div class="my-answer-div">
                    <div class="title-div">나</div>
                    {{ resultList[i] + item.answer[0].unit }}
                  </div>

                  <div class="average-div">
                    <div class="title-div">평균</div>
                    {{ averageList[i] + item.answer[0].unit }}
                  </div>
                </div>
              </q-item-section>
            </q-list>
          </div>
        </q-card-section>

        <q-separator />
        <router-link to="/main" style="width: 100%; padding-bottom: 100px">
          <q-btn flat color="dark" style="width: 100%" label="처음으로" />
        </router-link>
        <q-separator />
        <q-btn
          flat
          color="dark"
          @click="copyLink"
          style="width: 100%"
          label="테스트 공유하기"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { averageModel } from 'src/assets/AverageContentModel';
import axios from 'axios';

export default defineComponent({
  name: 'AverageResultPage',
  setup() {
    const dialog = ref(false);
    const position = ref('top');
    let userName: any = null;
    return {
      averageModel,
      dialog,
      position,
      open(pos: any) {
        position.value = pos;
        dialog.value = true;
      },
      userName,
    };
  },
  data() {
    return {
      title: '',
      desc: '',
      image: '',
      questionId: 0,
      answerId: 0,
      // MARK: undefined error 발생하여 임시로 answer key 넣어 줌
      resultList: [{ answer: '' }],
      resultString: '',
      averageList: [],
    };
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    if (
      this.$route.query.result != null &&
      process.env.DAO_ENDPOINT != undefined
    ) {
      const resultQuery: string | any = this.$route.query.result;
      const avgQuery: string | any = this.$route.query.avg;
      const nickName: string | any =
        this.$q.sessionStorage.getItem('user_nickname');

      this.resultList = JSON.parse(decodeURI(resultQuery));
      this.averageList = JSON.parse(decodeURI(avgQuery));

      this.userName = nickName;
    }
  },
  methods: {
    // MARK: 공유하기 클릭 시 클립보드에 url 복사
    copyLink: function () {
      const copy = (text: string) => {
        // 임시의 textarea 생성
        const $textarea = document.createElement('textarea');

        // body 요소에 존재해야 복사가 진행됨
        document.body.appendChild($textarea);

        // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
        $textarea.value = text;
        $textarea.select();

        // 복사 후 textarea 지우기
        document.execCommand('copy');
        document.body.removeChild($textarea);
      };
      const query = encodeURI(
        `?friend_id=${this.$q.sessionStorage.getItem(
          'user_nickname'
        )}&content=average`
      );
      // MARK: 현재 모드가 개발 모드인지 배포 모드인지 확인하여 해당 주소값 복사
      if(process.env.NODE_ENV == 'development') {
        copy(`http://localhost:9100${query}`);
      }
      // MARK: process.env.NODE_ENV == 'production'
      else {
        copy(`http://ssossotest.com${query}`);
      }
      alert('링크가 클립보드에 공유되었어요!');
    },
  },
});
</script>
<style scoped>
.question-div {
  background-color: #ffe5a6;
  padding: 4px;
  text-align: center;
  font-size: larger;
}
.answer-div {
  padding: 10px;
}
.my-answer-div {
  margin-top: 10px;
  display: flex;
}
.average-div {
  margin-top: 5px;
  display: flex;
}
.title-div {
  width: 50px;
  font-weight: bold;
  color: #505050;
}
.compare-div {
  color: #f57c00;
}
</style>
