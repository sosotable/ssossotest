<template>
  <q-page class="row items-center justify-evenly">
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// MARK: 사용 데이터 외부화
import { tasteModel } from 'src/assets/tasteContentModel';
import axios from 'axios';
import {stringify} from "querystring";
import {types} from "util";
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
      selectedAnswer: ''
    }
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
      this.selectedFlag = true
      this.selectedAnswer = tasteModel[this.questionId].answer[selected].answer
      this.tasteModel[this.questionId].result = selected;
      setTimeout(() => {
        this.questionId += 1;
        this.selectedFlag = false;
        if (this.questionId == this.tasteModel.length) {
          // MARK: 서버로 데이터 송신 백엔드에서 결과처리
          axios
            .post('http://127.0.0.1:3000/result/taste', this.tasteModel)
          let result: any = []
          for(let i = 0; i < this.tasteModel.length; i++) {
             result.push(this.tasteModel[i].answer[selected].answer)
          }
          this.$router.push({
            path: '/result/tastes',
            query: {result: JSON.stringify(result)}
          })
        }
      }, 500);
    },
  },
});
</script>
