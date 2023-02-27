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
              <q-item v-if="(item.type = 'range')">
                <q-item-section>{{ item.question }}</q-item-section>
                <q-item-section>{{
                  item.result + item.answer[0].unit
                }}</q-item-section>
              </q-item>
              <q-item v-else-if="(item.type = 'button')">
                <q-item-section>{{ item.question }}</q-item-section>
                <!-- error -->
                <q-item-section>{{ item.result }}</q-item-section>
              </q-item>
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
    };
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    if (this.$route.query.result != null) {
      const resultQuery: string | any = this.$route.query.result;
      // MARK: 쿼리스트링 디코딩
      const decodedResult = JSON.parse(decodeURI(resultQuery));
      this.title = decodedResult.title[0];
      this.desc = decodedResult.desc;
      this.image = decodedResult.image[0];
      // MARK: 세션에 저장된 사용자 nickname으로 기록된 average결과가 있는지 확인함
      axios
        .post('http://127.0.0.1:3000/DAO/SELECT', {
          columns: '*',
          table: 'average',
          where: `\`key\` = '${this.$q.sessionStorage.getItem(
            'user_nickname'
          )}'`,
        })
        .then((response) => {
          // MARK: 기존 결과가 존재한다면 => UPDATE
          if (response.data.length > 0) {
            axios
              .post('http://127.0.0.1:3000/DAO/UPDATE', {
                table: 'average',
                set: `result = '${JSON.stringify({
                  title: decodedResult.title[0],
                  desc: decodedResult.desc,
                  image: decodedResult.image[0],
                })}'`,
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
          // MARK: 기존 결과가 존재하지 않는다면 => INSERT
          else {
            axios
              .post('http://127.0.0.1:3000/DAO/INSERT', {
                table: 'average',
                columns: '`key`, result',
                values: `'${this.$q.sessionStorage.getItem(
                  'user_nickname'
                )}','${JSON.stringify({
                  title: decodedResult.title[0],
                  desc: decodedResult.desc,
                  image: decodedResult.image[0],
                })}'`,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {},
});
</script>
<style scoped></style>
