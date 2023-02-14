<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="this.title" class="row items-start q-gutter-md">
      <q-card class="my-card" flat bordered >
        <q-img
          src="src/assets/images/mbti/title.jpeg"
        />
        <q-card-section>
          <div class="text-overline text-orange-9"></div>
          <div class="text-h5 q-mt-sm q-mb-xs">음식 MBTI 알아보기</div>
          <div class="text-caption text-grey">
            두근두근 신학기가 시작되었어요!<br>개강 후 일어나는 여러 상황에서<br>나에게 맞는 선택을 하고 결과를 확인해보세요!
          </div>
        </q-card-section>
        <q-btn flat color="dark" label="시작하기" @click="start"/>
      </q-card>
    </div>
    <div v-if="this.question">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <q-chat-message
            name="내면의 농담곰"
            avatar="https://i.pinimg.com/564x/43/09/78/43097860e53ce742582262908cfafff8.jpg"
            stamp="1 minutes ago"
            sent
            text-color="white"
            bg-color="primary"
          >
            <div>
              {{this.mbtiModel[questionId].question[0]}}
            </div>
            <div>
              {{this.mbtiModel[questionId].question[1]}}
              <div id="avatar">
                <img :src="this.mbtiModel[questionId].question[2]" style="width: 28px" class="my-emoticon">
              </div>
            </div>
          </q-chat-message>

          <q-chat-message
            name="나"
            avatar="https://i.pinimg.com/564x/c7/ab/9a/c7ab9a58e98a9d0b688957428856aaf4.jpg"
            bg-color="amber"
          >
            <q-spinner-dots size="2rem" />
          </q-chat-message>
          <q-btn color="white" text-color="black" @click="select(1)" :label="mbtiModel[questionId].answer[0].answer" />
          <q-btn color="white" text-color="black" @click="select(2)" :label="mbtiModel[questionId].answer[1].answer" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// MARK: 사용 데이터 외부화
import { mbtiModel } from 'src/assets/ContentModel'
import axios from 'axios';
export default defineComponent({
  name: 'MBTIPage',
  setup () {
    return {
      mbtiModel
    };
  },
  data() {
    return {
      // MARK: 타이틀 플래그 : true일 경우 테스트 설명이 보여짐
      title: true,
      // MARK: 문제 플래그: true일 경우 문제들이 보여짐, default value는 false(처음엔 보여지지 않음)
      question: false,
      // MARK: 문제 아이디: 해당 id의 문제만을 보여지도록 함
      questionId: 0
    }
  },
  mounted() {
    //
  },
  methods: {
    // MARK: 시작하기 버튼을 누를 경우 타이틀 이미지를 보이지 않게(false) 변환, 문제를 보이게(true) 변환
    start: function () {
      this.title = false
      this.question = true
    },
    // MARK: 문제 버튼 선택 시
    select: function (selected: number) {
      this.mbtiModel[this.questionId].result = selected
      this.questionId += 1
      // MARK: 만약 문제를 다 풀었다면(문제의 총 길이 == 문제 아이디)
      if(this.mbtiModel.length == this.questionId) {
        // MARK: 서버로 데이터 송신 백엔드에서 결과처리
        axios.post('http://127.0.0.1:3000/result/mbti', this.mbtiModel)
          .then((response) => {
            // MARK: response 결과를 받아 result파싱
            const title = response.data.title
            const desc = response.data.desc
            const image = response.data.image
            // MARK: 보안을 위해 uri인코딩
            const result = encodeURI(JSON.stringify({
              title: title,
              desc: desc,
              image: image
            }))
            // MARK: 결과 페이지로 라우팅, 결과는 쿼리스트링을 통해 전달
            this.$router.push({
              path: '/result/mbti',
              query: {result: result}
            })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
});
</script>
<style scoped>
  .q-btn {
    margin: 5px !important;
  }
</style>
