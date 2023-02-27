<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="this.title" class="row items-start q-gutter-md">
      <q-card class="my-card" flat bordered >
        <q-img
          src="src/assets/images/average/title.jpeg"
        />
        <q-card-section>
          <div class="text-overline text-orange-9"></div>
          <div class="text-h5 q-mt-sm q-mb-xs">대한민국 음식 평균</div>
          <div class="text-caption text-grey">
            나의 음식 취향을 대한민국 평균과 비교해보세요
          </div>
        </q-card-section>
        <q-btn flat color="dark" label="시작하기" @click="start"/>
      </q-card>
    </div>
    <div v-if="this.question && this.questionId < this.averageModel.length">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <div class="absolute-top">

            <div v-if="this.averageModel[questionId].type === 'range'">
              <div class ="text-h6">
                {{averageModel[questionId].question + rangeValue + averageModel[questionId].answer[0].unit}}
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
                <q-btn flat color="dark" label="다음" @click="select(rangeValue)"/>
              </div>
            </div>

            <div v-else-if="this.averageModel[questionId].type === 'button'" >
              <div class ="text-h6">
                {{averageModel[questionId].question}}
              </div>
              <div v-if="!selectedFlag">
                <div v-for="(item, i) in this.averageModel[questionId].answer" :key="i">
                  <q-btn color="white" text-color="black" @click="select(i)" :label="item.answer + i" />
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
import { defineComponent, ref } from "vue";
import { averageModel } from "src/assets/AverageContentModel"
import axios from "axios";

export default defineComponent({
  name: "AveragePage",
  setup () {
    return {
      averageModel
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
      rangeValue: 0
    }
  },
  mounted() {
    console.log(averageModel)
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
      this.averageModel[this.questionId].result = selected
      console.log(selected)
      console.log(this.averageModel[this.questionId].result)
      this.rangeValue = 0
      this.questionId += 1
      this.selectedFlag = false

      /*
      if (this.questionId == this.averageModel.length) {

        // MARK: 서버로 데이터 송신 백엔드에서 결과처리
        axios.post("http://127.0.0.1:3000/result/average", this.averageModel)

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
              path: "/result/average",
              query: {result: result}
            })
          })

          .catch((error) => {
            console.log(error);
          })

      }
      */

      if (this.questionId == this.averageModel.length) {
        this.$router.push({
          path: "/result/average"
        })
      }
    }
  }


});
</script>
