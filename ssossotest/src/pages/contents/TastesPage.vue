<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="this.title" class="row items-start q-gutter-md">
      <div v-if="friendResult">
        <q-card class="my-card" flat bordered>
          <q-img src="'/images/tastes/title.jpg'" />
          <q-card-section>
            <div class="text-overline text-orange-9"></div>
            <div class="text-h5 q-mt-sm q-mb-xs">친구 음식 취향 맞히기</div>
            <div class="text-caption text-grey">
              친구의 음식 취향을 맞혀보세요!
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

      <div v-else>
        <q-card class="my-card" flat bordered>
          <q-img src="/images/tastes/title.jpg" />
          <q-card-section>
            <div class="text-overline text-orange-9"></div>
            <div class="text-h5 q-mt-sm q-mb-xs">음식 취향 맞히기</div>
            <div class="text-caption text-grey">
              나의 음식 취향을 기록하고 친구들의 음식 취향을 맞혀보세요!
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
    </div>

    <div v-if="this.question && this.questionId < this.tasteModel.length">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <div class="absolute-top">
            <div
              class="card-header"
              style="background-color: transparent !important"
            >
              <h6 class="card text-center" style="margin-top: 10px">
                {{ this.tasteModel[questionId].question[0] }}
                <q-img
                  :src="`/images/tastes/${questionId}.png`"
                  style="
                    width: 100%;
                    height: 13pc;
                    margin-top: 10px;
                    margin-left: 0;
                    margin-right: 0px;
                  "
                />
              </h6>
            </div>
            <transition style="padding: 0 10px 0 0">
              <div v-if="!selectedFlag">
                <template
                  v-for="index in tasteModel[questionId].answer.length"
                  :key="index"
                >
                  <q-btn
                    color="white"
                    text-color="black"
                    style="width: 100%"
                    @click="select(index - 1)"
                    :label="tasteModel[questionId].answer[index - 1].answer"
                  >
                  </q-btn>
                </template>
              </div>
            </transition>
          </div>
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
import { stringify } from 'querystring';
import { types } from 'util';
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
      friendResult: false,
      friend: [],
    };
  },
  mounted() {
    if (this.$route.query.friend_id != undefined) {
      this.friendResult = true;
    }
    console.log(this.$route.query);
    console.log(this.$route.query.friend);

    //&& process.env.DAO_ENDPOINT != undefined
  },
  methods: {
    // MARK: 시작하기 버튼을 누를 경우 타이틀 이미지를 보이지 않게(false) 변환, 문제를 보이게(true) 변환
    start: function () {
      this.title = false;
      this.question = true;
    },
    // MARK: 문제 버튼 선택 시
    select: function (selected: number) {
      this.selectedFlag = true;
      this.selectedAnswer = tasteModel[this.questionId].answer[selected].answer;
      console.log(tasteModel[this.questionId].answer[selected].answer);
      console.log(this.selectedAnswer);
      this.tasteModel[this.questionId].result = selected;
      setTimeout(() => {
        this.questionId += 1;
        this.selectedFlag = false;

        if (this.questionId == this.tasteModel.length) {
          let result: any = [];
          for (let i = 0; i < this.tasteModel.length; i++) {
            result.push(tasteModel[i].answer[this.tasteModel[i].result].answer);
          }
          console.log(result);

          if (this.$route.query.friend_id === undefined) {
            console.log('메인');

            // MARK: 결과 페이지로 라우팅, 결과는 쿼리스트링을 통해 전달
            axios.post('/result/tastes', result);
            this.$router.push({
              path: '/result/tastes',
              query: { result: encodeURI(JSON.stringify(result)) },
            });
          }

          // MARK: 공유받아서 들어온 경우
          else {
            let friend: any = [];
            friend.push(this.$route.query.friend);
            console.log(friend);
            console.log(friend[0]);
            console.log(friend[1]);

            let friend__result = friend[0].split(',');

            console.log(friend__result);
            console.log('친구');
            console.log(this.$route.query.friend);
            this.$router.push({
              path: '/result/tastes',
              query: {
                result: encodeURI(JSON.stringify(result)),
                friend_id: encodeURI(String(this.$route.query.friend_id)),
                friend_result: friend__result,
              },
            });
          }
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
