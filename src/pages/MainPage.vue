<template>
  <q-page class="column items-center justify-center">
    <!--    MARK: 테스트 선택 페이지: v-for을 통한 카드 반복 -->
    <template v-for="card in cards" v-bind:key="card">
      <q-card class="main-card" style="width: 70%; margin: 8px">
        <q-img :src="card.image" height="140px">
          <div class="absolute-bottom">
            <div class="text-h6">{{ card.title }}</div>
            <div class="text-subtitle2">{{ card.desc }}</div>
          </div>
        </q-img>
        <q-card-actions>
          <router-link
            class="text-black"
            :to="`content/${card.tag}`"
            style="text-decoration-line: none; width: 100%; height: 25px"
          >
            <q-btn flat style="width: 100%">시작하기</q-btn>
          </router-link>
        </q-card-actions>
      </q-card>
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Cards } from 'components/models';
import axios from 'axios';

export default defineComponent({
  name: 'MainPage',
  setup() {
    return {
      $q: useQuasar(),
      // MARK: 테스트 카드 상단 v-for에서 사용
      cards: ref<Cards[]>([
        {
          image: '/images/mbti/title.jpeg',
          title: '음식 MBTI 알아보기',
          desc: '선택을 통해 알아보는 나의 음식 성격유형',
          tag: 'mbti',
        },
        {
          image: '/images/tastes/title.jpg',
          title: '음식 취향 알아보기',
          desc: '나의 음식 취향을 기록하고 공유해보세요',
          tag: 'tastes',
        },
        {
          image: '/images/average/title.jpg',
          title: '음식 평균 알아보기',
          desc: '나의 음식 성향을 대한민국 평균과 비교해보세요',
          tag: 'average',
        },
      ]),
    };
  },
  mounted() {
    // MARK: 사용자 세션을 가지고 있지 않다면 인덱스 페이지(/) 로 라우팅
    this.$q.sessionStorage.has('user_nickname') ? true : this.$router.push('/');
  },
});
</script>
<style scoped>
a:hover {
  color: orange;
}
</style>
