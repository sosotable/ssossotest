<template>
  <q-page class="page row items-center justify-evenly">
    <div v-if="this.titleFlag" class="page-div justify-center items-start">
      <q-card class="content-intro" flat bordered>
        <q-img src="/images/mbti/title.jpeg" />
        <q-card-section>
          <div class="text-overline text-orange-9"></div>
          <div class="text-h5 q-mt-sm q-mb-xs">음식 MBTI 알아보기</div>
          <div class="text-caption text-grey">
            두근두근 신학기가 시작되었어요!<br />개강 후 일어나는 여러
            상황에서<br />나에게 맞는 선택을 하고 결과를 확인해보세요!
          </div>
        </q-card-section>
        <q-btn
          class="float-right"
          flat
          color="dark"
          label="시작하기"
          @click="start"
        />
      </q-card>
    </div>
    <div v-if="this.question && this.questionId < this.mbtiModel.length">
      <div class="q-pa-md row justify-center">
        <div class="content-container">
          <div class="content-view absolute-top justify-center items-center">
            <div class="test-page">
              <q-linear-progress
                :value="questionId / mbtiModel.length"
                color="warning"
                style="margin-top: -32px; margin-bottom: 35px"
                size="6px"
              />
              <q-chat-message
                name="내면의 농담곰"
                avatar="https://i.pinimg.com/564x/43/09/78/43097860e53ce742582262908cfafff8.jpg"
                stamp="1 minutes ago"
                sent
                text-color="black"
                bg-color="primary"
                style="margin: 10px"
              >
                <div>
                  {{ this.mbtiModel[questionId].question[0] }}
                </div>
                <div>
                  {{ this.mbtiModel[questionId].question[1] }}
                  <div id="avatar">
                    <img
                      :src="this.mbtiModel[questionId].question[2]"
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
                style="margin: 10px"
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
          </div>
          <Transition class="absolute-bottom flex column" style="">
            <div class="content-view">
              <div v-if="!selectedFlag">
                <q-btn
                  color="white"
                  text-color="black"
                  @click="select(1)"
                  :label="mbtiModel[questionId].answer[0].answer"
                />
                <q-btn
                  color="white"
                  text-color="black"
                  @click="select(2)"
                  :label="mbtiModel[questionId].answer[1].answer"
                />
              </div>
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
import { mbtiModel } from 'src/assets/ContentModel';
import { useMBTIStore } from 'stores/mbti';
import { storeToRefs } from 'pinia';

import axios from 'axios';
export default defineComponent({
  name: 'MBTIPage',
  setup() {
    const store = useMBTIStore();
    const { titleFlag, question, questionId, selectedFlag, selectedAnswer } =
      storeToRefs(store);
    return {
      mbtiModel,
      titleFlag,
      question,
      questionId,
      selectedFlag,
      selectedAnswer,
    };
  },
  data() {
    return {
      //
    };
  },
  mounted() {
    //
  },
  methods: {
    // MARK: 시작하기 버튼을 누를 경우 타이틀 이미지를 보이지 않게(false) 변환, 문제를 보이게(true) 변환
    start: function () {
      this.titleFlag = false;
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
      this.selectedAnswer =
        selected == 1
          ? mbtiModel[this.questionId].answer[0].answer
          : mbtiModel[this.questionId].answer[1].answer;
      this.mbtiModel[this.questionId].result = selected;
      setTimeout(() => {
        this.questionId += 1;
        this.selectedFlag = false;
        if (this.questionId == this.mbtiModel.length) {
          axios
            .post('/result/mbti', this.mbtiModel)
            .then((response) => {
              // MARK: 보안을 위해 uri인코딩
              const result = encodeURI(
                JSON.stringify({
                  mbti: response.data.mbti,
                })
              );
              if (this.$route.query.friend_id === undefined) {
                // MARK: 결과 페이지로 라우팅, 결과는 쿼리스트링을 통해 전달
                this.$router.push({
                  path: '/result/mbti',
                  query: { result: result },
                });
              }
              // MARK: 공유받아서 들어온 경우
              else {
                this.$router.push({
                  path: '/result/mbti',
                  query: {
                    result: result,
                    friend_id: encodeURI(String(this.$route.query.friend_id)),
                  },
                });
              }
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.q-message-text {
  margin: 5px 0 5px 5px !important;
}
</style>
