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
    <div v-if="this.question && this.questionId < this.mbtiModel.length">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <div class="absolute-top">
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
<!--              MARK: 답안을 선택했다면 해당 답안을 chat message로 보여줌-->
              <div v-if="selectedFlag">
                {{selectedAnswer}}
              </div>
              <div v-else>
                <q-spinner-dots size="2rem" />
              </div>
            </q-chat-message>
          </div>
          <Transition>
            <div v-if="!selectedFlag">
              <q-btn color="white" text-color="black" @click="select(1)" :label="mbtiModel[questionId].answer[0].answer" />
              <q-btn color="white" text-color="black" @click="select(2)" :label="mbtiModel[questionId].answer[1].answer" />
            </div>
          </Transition>
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
      questionId: 0,
      selectedFlag: false,
      selectedAnswer: ''
    }
  },
  mounted() {
    console.log(mbtiModel)
  },
  methods: {
    // MARK: 시작하기 버튼을 누를 경우 타이틀 이미지를 보이지 않게(false) 변환, 문제를 보이게(true) 변환
    start: function () {
      this.title = false
      this.question = true
    },
    // MARK: 문제 버튼 선택 시
    select: function (selected: number) {
      /** MARK:
       * 문제 버튼 선택 시 selectedFlag값 true로 변경 -> 선택한 답이 chat div에 보여짐
       * 선택 애니메이션 구현을 위해 setTimeout을 통해 0.5초 후 다음 질문으로 넘어가도록 함
       * Transition을 통한 fade out 구현
       * */
      this.selectedFlag = true
      this.selectedAnswer = selected == 1 ? mbtiModel[this.questionId].answer[0].answer : mbtiModel[this.questionId].answer[1].answer
      this.mbtiModel[this.questionId].result = selected
      setTimeout(()=>{
        this.questionId += 1
        this.selectedFlag = false
        if(this.questionId == this.mbtiModel.length) {
          // MARK: 서버로 데이터 송신 백엔드에서 결과처리
          axios.post('http://127.0.0.1:3000/result/mbti', this.mbtiModel)
            .then((response) => {
              // MARK: response 결과를 받아 result파싱
              const title = response.data.title
              const desc = response.data.desc
              const image = response.data.type
              // MARK: 보안을 위해 uri인코딩
              const result = encodeURI(JSON.stringify({
                title: title,
                desc: desc,
                image: image
              }))


              if(this.$route.query.friend_id === undefined) {
                // MARK: 결과 페이지로 라우팅, 결과는 쿼리스트링을 통해 전달
                this.$router.push({
                  path: '/result/mbti',
                  query: {result: result}
                })
              }
              // MARK: 공유받아서 들어온 경우
              else {
                this.$router.push({
                  path: '/result/mbti',
                  query: {
                    result: result,
                    friend_id: encodeURI(String(this.$route.query.friend_id))
                  }
                })
              }

            })
            .catch((error) => {
              console.log(error);
            })
        }
      },500)
    }
  }
});
</script>
<style scoped>
  .q-btn {
    margin: 5px !important;
  }
  /* we will explain what these classes do next! */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
