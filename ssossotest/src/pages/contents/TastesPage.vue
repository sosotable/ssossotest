<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="this.title" class="row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img src="src/assets/images/tastes/title.jpg" />
        <q-card-section>
          <div class="text-overline text-orange-9"></div>
          <div class="text-h5 q-mt-sm q-mb-xs">음식 취향 맞추기</div>
          <div class="text-caption text-grey">
            나의 음식 취향을 기록하고 친구들의 음식 취향을 맞춰보세요!
          </div>
        </q-card-section>
        <q-btn flat color="dark" label="시작하기" @click="start" />
      </q-card>
    </div>
    <div v-if="this.question && this.questionId < this.tasteModel.length">
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
                {{ this.tasteModel[questionId].question[0] }}
                <div id="avatar">
                  <img
                    :src="this.tasteModel[questionId].question[2]"
                    style="width: 28px"
                    class="my-emoticon"
                  />
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
                {{ selectedAnswer }}
              </div>
              <div v-else>
                <q-spinner-dots size="2rem" />
              </div>
            </q-chat-message>
          </div>
          <Transition>
            <div v-if="!selectedFlag">
              <ans
                v-for="index in tasteModel[questionId].answer.length"
                :key="index"
              >
                <q-btn
                  color="white"
                  text-color="black"
                  @click="select(index)"
                  :label="tasteModel[questionId].answer[index - 1].answer"
                >
                </q-btn>
              </ans>
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
import { tasteModel } from 'src/assets/tasteContentModel';
import axios from 'axios';
export default defineComponent({
  name: 'TASTEPage',
  setup() {
    return {
      tasteModel,
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
      selectedAnswer: '',
    };
  },
  mounted() {
    console.log(tasteModel);
  },
  methods: {
    // MARK: 시작하기 버튼을 누를 경우 타이틀 이미지를 보이지 않게(false) 변환, 문제를 보이게(true) 변환
    start: function () {
      this.title = false;
      this.question = true;
    },
    // MARK: 문제 버튼 선택 시
    select: function (selected: number) {
      /** MARK:
       * 문제 버튼 선택 시 selectedFlag값 true로 변경 -> 선택한 답이 chat div에 보여짐
       * 선택 애니메이션 구현을 위해 setTimeout을 통해 0.5초 후 다음 질문으로 넘어가도록 함
       * Transition을 통한 fade out 구현
       * */
      this.selectedFlag = true;
      this.selectedAnswer = tasteModel[this.questionId].answer[selected].answer;
      //this.selectedAnswer = selected == 1 ? tasteModel[this.questionId].answer[0].answer : tasteModel[this.questionId].answer[1].answer
      this.tasteModel[this.questionId].result = selected;
      setTimeout(() => {
        this.questionId += 1;
        this.selectedFlag = false;
        if (this.questionId == this.tasteModel.length) {
          // MARK: 서버로 데이터 송신 백엔드에서 결과처리
          axios
            .post('http://127.0.0.1:3000/result/taste', this.tasteModel)
            .then((response) => {
              // MARK: response 결과를 받아 result파싱
              const title = response.data.title;
              const desc = response.data.desc;
              const image = response.data.image;
              // MARK: 보안을 위해 uri인코딩
              const result = encodeURI(
                JSON.stringify({
                  title: title,
                  desc: desc,
                  image: image,
                  selected: selected,
                })
              );
              // MARK: 결과 페이지로 라우팅, 결과는 쿼리스트링을 통해 전달
              this.$router.push({
                path: '/result/taste',
                query: { result: result },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, 500);
    },
  },
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
