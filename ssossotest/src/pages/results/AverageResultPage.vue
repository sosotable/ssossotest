<template>
  <q-page class="row items-center justify-evenly absolute-top">
    <div class="row items-start">
      <q-card class="my-card" flat bordered>
        <q-img :src="`src/assets/images/average/${this.image}.jpeg`" />
        <q-card-section>
          <div class="text-overline text-orange-9">당신의 결과!</div>
          <div class="q-pa-md" style="max-width: 350px">
            <q-list
              bordered
              separator
              v-for="(item, i) in this.averageModel"
              :key="i"
            >
              <q-item-section>{{ item.question }}</q-item-section>

              <div v-if="item.type === 'button' && item.answer[resultList[i]]">
                <q-item-section>{{ item.answer[resultList[i]].answer }}</q-item-section>
              </div>

              <div v-else>
                <q-item-section>{{ resultList[i] + item.answer[0].unit }}</q-item-section>
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
    return {
      averageModel,
      dialog,
      position,
      open(pos: any) {
        position.value = pos;
        dialog.value = true;
      },
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

      this.resultList = JSON.parse(resultQuery);

      axios
        .post(process.env.DAO_ENDPOINT, {
          DML: 'SELECT',
          columns: '*',
          table: 'average',
          where: `\`key\` = '${this.$q.sessionStorage.getItem(
            'user_nickname'
          )}'`,
        })
        .then((response) => {
          // MARK: 기존 결과가 존재한다면 => UPDATE
          if (
            response.data.length > 0 &&
            process.env.DAO_ENDPOINT != undefined
          ) {
            axios
              .post(process.env.DAO_ENDPOINT, {
                DML: 'UPDATE',
                table: 'average',
                set: `result = '${resultQuery}'`,
                where: `\`key\` = '${this.$q.sessionStorage.getItem(
                  'user_nickname'
                )}'`,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          // MARK: 기존 결과가 존재한다면 => UPDATE
          else {
            if (process.env.DAO_ENDPOINT != undefined) {
              axios
                .post(process.env.DAO_ENDPOINT, {
                  DML: 'INSERT',
                  table: 'average',
                  columns: '`key`, result',
                  values: `'${this.$q.sessionStorage.getItem(
                    'user_nickname'
                  )}','${resultQuery}'`,
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        });
    }
  },
  methods: {},
});
</script>
<style scoped></style>
