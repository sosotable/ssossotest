<template>
  <q-page class="flex page column items-center justify-center">
    <div
      v-if="this.title"
      class="flex page-div column items-center"
      style="margin: auto"
    >
      <div class="content-intro" v-if="friendResult">
        <q-card flat bordered class="content-card">
          <q-img src="/images/tastes/title.jpg" />
          <q-card-section>
            <div class="text-overline text-orange-9"></div>
            <div v-if="friendId !== null" class="text-h5 q-mt-sm q-mb-xs">
              {{ friendId }}님의 음식 취향 맞히기
            </div>
            <div v-else class="text-h5 q-mt-sm q-mb-xs">음식 취향 맞히기</div>
            <div class="text-caption text-grey">
              친구의 음식 취향을 맞혀보세요!
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              class="float-right"
              flat
              color="dark"
              label="시작하기"
              @click="start"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div v-else class="content-intro" style="margin: auto">
        <q-card flat bordered class="content-card">
          <q-img src="/images/tastes/title.jpg" />
          <q-card-section>
            <div class="text-overline text-orange-9"></div>
            <div class="text-h5 q-mt-sm q-mb-xs">음식 취향 맞히기</div>
            <div class="text-caption text-grey">
              나의 음식 취향을 기록하고 친구들의 음식 취향을 맞혀보세요!
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              class="float-right"
              flat
              color="dark"
              label="시작하기"
              @click="start"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-if="this.question && this.questionId < this.tasteModel.length">
      <div class="content-card flex column justify-center">
        <div style="width: 100%; max-width: 400px">
          <div class="content-card absolute-top">
            <div>
              <q-linear-progress
                :value="questionId / tasteModel.length"
                color="warning"
                style="margin-top: -32px; margin-bottom: 35px"
                size="6px"
              />
              <div
                class="card-header"
                style="background-color: transparent !important"
              >
                <h6 class="card text-center" style="margin-top: 10px">
                  {{ this.tasteModel[questionId].question[0] }}
                  <q-img
                    :src="`/images/tastes/${tasteModel[questionId].id}.png`"
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// MARK: 사용 데이터 외부화
import { tasteModel } from 'src/assets/tasteContentModel';
import { useTastesStore } from 'stores/tastes';
import { storeToRefs } from 'pinia';

import axios from 'axios';
import { stringify } from 'querystring';
import { types } from 'util';
export default defineComponent({
  name: 'TASTEPage',
  setup() {
    const store = useTastesStore();
    const { titleFlag, question, questionId, selectedFlag, selectedAnswer } =
      storeToRefs(store);
    const selectedAnswerList: any[] = [];
    let friendId: any = null;
    return {
      tasteModel,
      selectedAnswerList,
      friendId,
      titleFlag,
      question,
      questionId,
      selectedFlag,
      selectedAnswer,
    };
  },
  data() {
    return {
      // MARK: 타이틀 플래그 : true일 경우 테스트 설명이 보여짐
      title: true,
      /*
      // MARK: 문제 플래그: true일 경우 문제들이 보여짐, default value는 false(처음엔 보여지지 않음)
      question: false,
      // MARK: 문제 아이디: 해당 id의 문제만을 보여지도록 함
      questionId: 0,
      selectedFlag: false,
      selectedAnswer: '',
      */
      friendResult: false,
      resultFriend: [],
      score: 0,
    };
  },
  mounted() {
    if (this.$route.query.friend_id != undefined) {
      this.friendResult = true;
      const friendIdQuery: string | any = this.$route.query.friend_id;
      const friendQuery: string | any = this.$route.query.friend;
      this.friendId = String(friendIdQuery);
      this.resultFriend = JSON.parse(friendQuery);
    }
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
      this.selectedAnswerList.push(selected);
      this.tasteModel[this.questionId].result = selected;
      setTimeout(() => {
        this.questionId += 1;
        this.selectedFlag = false;

        const nickName: string | any =
          this.$q.sessionStorage.getItem('user_nickname');

        if (
          this.$route.query.friend !== undefined &&
          selected === Number(this.resultFriend[this.questionId - 1])
        ) {
          this.score++;
        }

        if (this.questionId == this.tasteModel.length) {
          if (this.$route.query.friend === undefined) {
            console.log('친구 X');
            // MARK: 결과 페이지로 라우팅, 결과는 쿼리스트링을 통해 전달
            axios.post('/result/tastes', this.selectedAnswerList);

            this.$router.push({
              path: '/result/tastes',
              query: {
                result: encodeURI(JSON.stringify(this.selectedAnswerList)),
                id: encodeURI(nickName),
              },
            });
          }

          // MARK: 공유받아서 들어온 경우
          else {
            this.$router.push({
              path: '/result/tastes',
              query: {
                result: encodeURI(JSON.stringify(this.selectedAnswerList)),
                friend_id: encodeURI(String(this.$route.query.friend_id)),
                // 사용자 key(uuid) 추가
                friend_key: encodeURI(String(this.$route.query.friend_key)),
                friend_result: this.$route.query.friend,
                id: encodeURI(nickName),
                score: encodeURI(String(this.score)),
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
