<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="card text-center">
      <ul class="list-group list-group-flush">
        <q-card v-for="(model, index) in tasteModel" :key = "index" class="my-card" flat bordered>
          <div class="card" style="width: 17rem;">
            <h6><p class="card-title">  {{model.question[0]}}</p></h6>
            <q-separator/>
            <q-separator/>
            <text-h6><p class = "card-subtitle mb-2 text-muted"> {{tasteModel[index].answer[tasteModel[index].result].answer}}</p></text-h6>
            <div v-if="friendResult">
              <text-h6><p class = "card-subtitle mb-2 text-muted"> {{friendResult[index]}}</p></text-h6>
            </div>
            <q-separator/><q-separator/><q-separator/><q-separator/>
          </div>
        </q-card>
      </ul>
      </div>

        <q-separator />
        <div v-if = "!this.friendResult">
        <q-btn
          flat
          color="dark"
          @click="copyLink"
          style="width: 100%"
          label="친구에게 공유하기"
        />
          <router-link to="/main" style="width: 100%">
            <q-btn flat color="dark" style="width: 100%" label="처음으로" />
          </router-link>
        </div>

        <div v-else>
        <q-separator />
        <router-link to="/main" style="width: 100%">
          <q-btn flat color="dark" style="width: 100%" label="다른 테스트 하기" />
        </router-link>
        </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { tasteModel } from 'src/assets/tasteContentModel';

export default defineComponent({
  name: 'TastesResultPage',
  setup() {
    return {
      tasteModel,
    };
  },
  data() {
    return {
      title: '',
      desc: '',
      image: '',
      selected: '',
      friendResult: false,
      result: [], /** 링크 받은 사용자의 선택 결과 **/
      resultFriend: [], /**링크 공유한 친구의 결과**/
    }
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    console.log(tasteModel[0].result)
    console.log(this.tasteModel[0].result)
    // const decoderesult = JSON.parse()

    /**if(this.$route.query.result != null) {
      console.log(this.$route.query.result)
       const resultQuery: string | any  = this.$route.query.result
       // MARK: 쿼리스트링 디코딩
      //this.result = this.$route.query.result
       this.result = JSON.parse(decodeURI(resultQuery))
      console.log(this.result)
      console.log(this.result[0])
    }**/

    if (this.$route.query.friend_id === undefined) {
      if(this.$route.query.result != null) {
        console.log("결과")
        console.log(this.$route.query.result)
        const resultQuery: string | any  = this.$route.query.result
        // MARK: 쿼리스트링 디코딩
        //this.result = this.$route.query.result
        this.result = JSON.parse(decodeURI(resultQuery))
        console.log(this.result)
        console.log(this.result[0])
        console.log(this.tasteModel[0].result)
      }
    }
    else {
      if(this.$route.query.result != null) {
        this.friendResult = true
        console.log("친구 결과")
        console.log(this.$route.query.result)
        const resultQuery: string | any  = this.$route.query.result
        const friendQuery: string | any = this.$route.query.friend_result
        // MARK: 쿼리스트링 디코딩

        this.result = JSON.parse(decodeURI(resultQuery))
        this.resultFriend = JSON.parse(decodeURI(friendQuery))
        console.log(resultQuery)
        console.log(friendQuery)
        console.log(this.result)
        console.log(this.result[0])
        console.log(this.resultFriend)
        console.log(this.resultFriend[0])
      }
    }
  },
  methods: {
    // MARK: 공유하기 클릭 시 클립보드에 url 복사
    copyLink: function () {
      const copy = (text: string) => {
        // 임시의 textarea 생성
        const $textarea = document.createElement('textarea');

        // body 요소에 존재해야 복사가 진행됨
        document.body.appendChild($textarea);

        // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
        $textarea.value = text;
        $textarea.select();

        // 복사 후 textarea 지우기
        document.execCommand('copy');
        document.body.removeChild($textarea);
      }
      const query = encodeURI(`?friend_id=${this.$q.sessionStorage.getItem('user_nickname')}&content=tastes&friend=${this.$route.query.result}`)
      copy(`http://127.0.0.1:9100${query}`)
      alert('링크가 클립보드에 공유되었어요!')
    }
  },
});
</script>
