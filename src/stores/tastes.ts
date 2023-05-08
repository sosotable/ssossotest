import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTastesStore = defineStore('tastes', {
  state: () => ({
    /** MARK: tastes content
     * **/
    // MARK: 타이틀 플래그 : true일 경우 테스트 설명이 보여짐
    titleFlag: ref<boolean>(true),
    // MARK: 문제 플래그: true일 경우 문제들이 보여짐, default value는 false(처음엔 보여지지 않음)
    question: ref<boolean>(false),
    // MARK: 문제 아이디: 해당 id의 문제만을 보여지도록 함
    questionId: ref<number>(0),
    selectedFlag: ref<boolean>(false),
    selectedAnswer: ref<string>(''),

    /** MARK: tastes result
     * **/
  }),

  getters: {},

  actions: {},
});
