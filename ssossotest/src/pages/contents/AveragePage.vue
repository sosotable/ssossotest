<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="this.title" class="row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img src="src/assets/images/average/title.jpeg" />
        <q-card-section>
          <div class="text-overline text-orange-9"></div>
          <div class="text-h5 q-mt-sm q-mb-xs">대한민국 음식 평균</div>
          <div class="text-caption text-grey">
            나의 음식 취향을 대한민국 평균과 비교해보세요
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
    <div v-if="this.question && this.questionId < this.averageModel.length">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <div class="absolute-top">
            <div v-if="this.averageModel[questionId].type === 'range'">
              <h6 class="card text-center">
                {{
                  averageModel[questionId].question +
                  rangeValue +
                  averageModel[questionId].answer[0].unit
                }}
                <q-img
                  :src="`/images/average/${questionId}.png`"
                  style="
                    width: 100%;
                    height: 13pc;
                    margin-top: 10px;
                    margin-left: 0;
                    margin-right: 0px;
                  "
                />
              </h6>
              <div class="q-pa-md">
                <q-slider
                  v-model="rangeValue"
                  :min="averageModel[questionId].answer[0].pMin"
                  :max="averageModel[questionId].answer[0].pMax"
                  :step="averageModel[questionId].answer[0].pStep"
                  snap
                  label
                  color="orange"
                />
                <q-btn
                  flat
                  color="dark"
                  label="다음"
                  @click="select(rangeValue)"
                />
              </div>
            </div>

            <div v-else-if="this.averageModel[questionId].type === 'button'">
              <h6 class="card text-center" style="margin-top: 10px">
                {{ averageModel[questionId].question }}
                <q-img
                  :src="`/images/average/${questionId}.png`"
                  style="
                    width: 100%;
                    height: 13pc;
                    margin-top: 10px;
                    margin-left: 0;
                    margin-right: 0px;
                  "
                />
              </h6>
              <transition style="padding: 0 10px 0 0">
                <div v-if="!selectedFlag">
                  <div
                    v-for="(item, i) in this.averageModel[questionId].answer"
                    :key="i"
                  >
                    <q-btn
                      color="white"
                      text-color="black"
                      style="width: 100%"
                      @click="select(i)"
                      :label="item.answer"
                    />
                  </div>
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
import { defineComponent } from 'vue';
import { averageModel } from 'src/assets/AverageContentModel';
import axios from 'axios';

export default defineComponent({
  name: 'AveragePage',
  setup() {
    const selectedAnswerList: any[] = [];
    let avgString: string | undefined;
    return {
      averageModel,
      selectedAnswerList,
      avgString,
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
      answerId: 0,
      selectedFlag: false,
      rangeValue: 0,
      selectedAnswer: '',
      resultList: [{ answer: '' }],
      resultString: '',
    };
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
      this.averageModel[this.questionId].result = selected;
      this.rangeValue = 0;
      this.questionId += 1;
      this.selectedFlag = false;

      if (
        this.questionId == this.averageModel.length &&
        process.env.DAO_ENDPOINT != undefined
      ) {
        this.resultString = JSON.stringify(this.selectedAnswerList).slice(
          1,
          -1
        );

        // MARK: 결과 값 insert
        axios
          .post(process.env.DAO_ENDPOINT, {
            DML: 'INSERT',
            table: 'average_result',
            values: this.resultString,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        axios.post('/result/calcaverage', this.selectedAnswerList);

        this.$router.push({
          path: '/result/calc-average',
          query: { result: encodeURI(JSON.stringify(this.selectedAnswerList)) },
        });
      }
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
