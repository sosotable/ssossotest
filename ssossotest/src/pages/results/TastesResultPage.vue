<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(model, index) in tasteModel" :key = "index" class="my-card" flat bordered>
        {{model.question[0]}}
        <q-img
          :src="`src/assets/images/taste/${this.image}.jpeg`"
        />
        {{model.answer[result[index]].answer}}
        <!--<template v-for = "i in result.length" : key = "i">
        {{result[0]}}
        </template>-->
        <!--<q-card-section>
          <div class="text-overline text-orange-9">당신의 취향 결과!</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{this.title}}</div>-->
          <!--          TODO: 내용 바꿔야 합니다-->
          <!--<div class="text-caption text-grey">
            {{this.desc}}
          </div>
          <template v-for="card in tasteModel" v-bind:key="card">
            <q-card class="my-card" style="width: 70%; margin: 10px;">
              <div class="absolute-bottom">
                <div class="text-h6">{{card.question}}</div>
                <div class="text-subtitle2">{{card.answer[selected]}}</div>
              </div>
            </q-card>
          </template>
        </q-card-section>-->
      </q-card>
        <router-link to="/main">
          <q-btn flat color="dark" label="처음으로"/>
        </router-link>
      <!--</q-card>-->
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { tasteModel } from 'src/assets/tasteContentModel'

export default defineComponent({
  name: 'TastesResultPage',
  setup () {
    return {
      tasteModel
    };
  },
  data() {
    return {
      title: '',
      desc: '',
      image: '',
      selected: '',
      result: []
    }
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    // const decoderesult = JSON.parse()
    if(this.$route.query.result != null) {
      console.log(this.$route.query.result)
       const resultQuery: string | any  = this.$route.query.result
       // MARK: 쿼리스트링 디코딩
      //this.result = this.$route.query.result
       this.result = JSON.parse(decodeURI(resultQuery))
      console.log(this.result)
      console.log(this.result[0])
      // this.title = decodedResult.title[0]
      // this.desc = decodedResult.desc[0]
      // this.image = decodedResult.image[0]
      // this.selected = decodedResult.selected[0]
    }
  }
});
</script>
