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
        <q-btn class = "float-right" flat color="dark" label="시작하기" @click="start" />
      </q-card>
    </div>
    <div v-if="this.question && this.questionId < this.averageModel.length">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <div class="absolute-top">
            <div v-if="this.averageModel[questionId].type === 'range'">
              <div class="text-h6">
                {{
                  averageModel[questionId].question +
                  rangeValue +
                  averageModel[questionId].answer[0].unit
                }}
              </div>
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
              <div class="text-h6">
                {{ averageModel[questionId].question }}
              </div>
              <div v-if="!selectedFlag">
                <div
                  v-for="(item, i) in this.averageModel[questionId].answer"
                  :key="i"
                >
                  <q-btn
                    color="white"
                    text-color="black"
                    @click="select(i)"
                    :label="item.answer"
                  />
                </div>
              </div>
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
    return {
      averageModel,
      selectedAnswerList,
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
      resultList: [{answer: ""}],
      resultString: '',
    };
  },
  mounted() {
    if (
      this.$route.query.result != null &&
      process.env.DAO_ENDPOINT != undefined
    ) {
      const resultQuery: string | any = this.$route.query.result;
      this.resultString = resultQuery.slice(1,-1)
      this.resultList = JSON.parse((resultQuery));

      // MARK: 결과 값 insert
      axios
        .post(process.env.DAO_ENDPOINT, {
          DML: 'INSERT',
          table: 'average_result',
          values: this.resultString
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

      if (this.questionId == this.averageModel.length) {
        axios.post('/result/average', this.selectedAnswerList);
        this.$router.push({
          path: '/result/average',
          query: { result: (JSON.stringify(this.selectedAnswerList))},
        });
      }
    },
  },
});
</script>
