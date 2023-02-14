<template>
  <q-page class="column items-center justify-center">
    <template v-for="card in cards" v-bind:key="card">
      <q-card class="my-card" style="width: 70%; margin: 10px;">
        <q-img :src="card.image">
          <div class="absolute-bottom">
            <div class="text-h6">{{card.title}}</div>
            <div class="text-subtitle2">{{card.desc}}</div>
          </div>
        </q-img>
        <q-card-actions>
          <q-btn flat>시작하기</q-btn>
        </q-card-actions>
      </q-card>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {useQuasar} from 'quasar';
import { Cards } from 'components/models';

export default defineComponent({
  name: 'MainPage',
  setup () {
    return {
      $q: useQuasar(),
      cards: ref<Cards[]>([
        {
          image: 'src/assets/images/mbti/title.jpeg',
          title: '음식 MBTI 알아보기',
          desc: '선택을 통해 알아보는 나의 음식 성격유형'
        },
        {
          image: 'src/assets/images/tastes/title.jpg',
          title: '음식 취향 알아보기',
          desc: '나의 음식 취향을 기록하고 공유해보세요'
        },
        {
          image: 'src/assets/images/average/title.jpg',
          title: '음식 평균 알아보기',
          desc: '나의 음식 성향을 대한민국 평균과 비교해보세요'
        },
      ])
    };
  },
  mounted() {
    if(this.$q.sessionStorage.has('user_nickname')) {

    }
    else {
      this.$router.push('/')
    }
  }
});
</script>
