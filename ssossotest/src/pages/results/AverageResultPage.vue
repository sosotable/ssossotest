<template>
  <q-page class="row items-center justify-evenly absolute-top">
    <div class="row items-start">
      <q-card class="my-card" flat bordered>
        <q-img :src="`src/assets/images/average/${this.image}.jpeg`" />
        <q-card-section style="width: 300px">
          <div class="text-overline text-orange-9">{{this.userName}}의 결과!</div>
          <div class="q-pa-none col">
            <q-list
              bordered
              separator
              v-for="(item, i) in this.averageModel"
              :key="i"
            >
              <q-item-section style="font-weight: bold">{{ item.question }}</q-item-section>

              <div v-if="item.type === 'button' && item.answer[resultList[i]]">
                <q-item-section>선택한 값 => {{ item.answer[resultList[i]].answer }}</q-item-section>
                <q-item-section style="font-weight: bold">평균</q-item-section>
                <div v-if="i === 1 || i === 2">
                  <q-item-section>{{ averageList[i] }}단계</q-item-section>
                </div>
                <div v-else>
                  <q-item-section>{{item.answer[0].answer}} : {{100-(averageList[i])*100}}%</q-item-section>
                  <q-item-section>{{item.answer[1].answer}} : {{(averageList[i])*100}}%</q-item-section>
                </div>

              </div>

              <div v-else>
                <q-item-section>선택한 값 => {{ resultList[i] + item.answer[0].unit }}</q-item-section>
                <q-item-section style="font-weight: bold">평균</q-item-section>
                <q-item-section>{{ averageList[i] + item.answer[0].unit }}</q-item-section>
              </div>
            </q-list>
          </div>
        </q-card-section>

        <q-separator />
        <router-link to="/main" style="width: 100%">
          <q-btn flat color="dark" style="width: 100%" label="처음으로" />
        </router-link>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { averageModel } from 'src/assets/AverageContentModel';
import axios from 'axios';

export default defineComponent({
  name: 'AverageResultPage',
  setup() {
    const dialog = ref(false);
    const position = ref('top');
    let userName: any = null
    return {
      averageModel,
      dialog,
      position,
      open(pos: any) {
        position.value = pos;
        dialog.value = true;
      },
      userName
    };
  },
  data() {
    return {
      title: '',
      desc: '',
      image: '',
      questionId: 0,
      answerId: 0,
      // MARK: undefined error 발생하여 임시로 answer key 넣어 줌
      resultList: [{answer: ""}],
      resultString: '',
      averageList: [],
    };
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    if (
      this.$route.query.result != null &&
      process.env.DAO_ENDPOINT != undefined
    ) {
      const resultQuery: string | any = this.$route.query.result;
      const avgQuery: string | any = this.$route.query.avg;
      const nickName: string | any = this.$q.sessionStorage.getItem('user_nickname')

      this.resultList = JSON.parse(resultQuery);
      this.averageList = JSON.parse(avgQuery);

      this.userName = nickName;
    }

  },
});
</script>
<style scoped></style>
