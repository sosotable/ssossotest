<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img
          :src="`src/assets/images/mbti/${this.image}.jpeg`"
        />
        <q-card-section>
          <div class="text-overline text-orange-9">당신의 결과!</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{this.title}}</div>
<!--          TODO: 내용 바꿔야 합니다-->
          <div class="text-caption text-grey">
            {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}}
            {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}}
            {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}}
            {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}}
            {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}} {{this.desc}}
          </div>
        </q-card-section>
        <router-link to="/main">
          <q-btn flat color="dark" label="처음으로"/>
        </router-link>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MBTIResultPage',
  setup () {
    return { };
  },
  data() {
    return {
      title: '',
      desc: '',
      image: ''
    }
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    if(this.$route.query.result != null) {
      const resultQuery: string | any  = this.$route.query.result
      // MARK: 쿼리스트링 디코딩
      const decodedResult = JSON.parse(decodeURI(resultQuery))
      this.title = decodedResult.title[0]
      this.desc = decodedResult.desc[0]
      this.image = decodedResult.image[0]
    }
  }
});
</script>

