<template>
  <q-page class="row items-center justify-evenly absolute-top">
    <div class="row items-start">
      <q-card class="my-card" flat bordered>
        <q-img :src="`src/assets/images/mbti/${this.image}.jpeg`" />
        <q-card-section>
          <div class="text-overline text-orange-9">당신의 결과!</div>
          <div class="text-h5">{{ this.title }} : {{ this.image }}</div>
          <!--          TODO: 내용 바꿔야 합니다-->
          <div class="text-caption text-grey" v-for="d in desc" v-bind:key="d">
            {{ d }}
          </div>
        </q-card-section>
        <q-separator />
        <!--        MARK: 공유받아서 들어온 경우에만 보여짐-->
        <div v-if="friendResult">
          <q-btn
            class="text-black"
            style="width: 100%"
            label="친구의 결과는 뭐였을까요?"
            icon="face"
            color="white"
            @click="open('bottom')"
          />
          <q-dialog v-model="dialog" :position="position">
            <q-card style="width: 350px">
              <q-img
                :src="`src/assets/images/mbti/${this.friendResultData.image}.jpeg`"
              />
              <q-card-section>
                <div class="text-overline text-orange-9">친구의 결과!</div>
                <div class="text-h5 q-mt-sm q-mb-xs">
                  {{ this.friendResultData.title }} :
                  {{ this.friendResultData.image }}
                </div>
                <!--          TODO: 내용 바꿔야 합니다-->
                <div
                  class="text-caption text-grey"
                  v-for="d in desc"
                  v-bind:key="d"
                >
                  {{ d }}
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>

        <q-separator />
        <router-link to="/main" style="width: 100%">
          <q-btn flat color="dark" style="width: 100%" label="처음으로" />
        </router-link>
        <q-separator />
        <q-btn
          flat
          color="dark"
          @click="copyLink"
          style="width: 100%"
          label="친구에게 공유하기"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'MBTIResultPage',
  setup() {
    const dialog = ref(false);
    const position = ref('top');
    return {
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
      friendResult: false,
      friendResultData: {},
    };
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    // MARK: 공유받아서 들어온 경우: 친구의 결과도 보여줌
    if (this.$route.query.friend_id != undefined) {
      this.friendResult = true;
      axios
        .post('http://127.0.0.1:3000/DAO/SELECT', {
          columns: '*',
          table: 'mbti',
          where: `\`key\` = '${decodeURI(
            String(this.$route.query.friend_id)
          )}'`,
        })
        .then((response) => {
          this.friendResultData = JSON.parse(response.data[0].result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (this.$route.query.result != null) {
      const resultQuery: string | any = this.$route.query.result;
      // MARK: 쿼리스트링 디코딩
      const decodedResult = JSON.parse(decodeURI(resultQuery));
      this.title = decodedResult.title[0];
      this.desc = decodedResult.desc;
      this.image = decodedResult.image[0];
      // MARK: 세션에 저장된 사용자 nickname으로 기록된 mbti결과가 있는지 확인함
      axios
        .post('http://127.0.0.1:3000/DAO/SELECT', {
          columns: '*',
          table: 'mbti',
          where: `\`key\` = '${this.$q.sessionStorage.getItem(
            'user_nickname'
          )}'`,
        })
        .then((response) => {
          // MARK: 기존 결과가 존재한다면 => UPDATE
          if (response.data.length > 0) {
            axios
              .post('http://127.0.0.1:3000/DAO/UPDATE', {
                table: 'mbti',
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
                table: 'mbti',
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
      };
      const query = encodeURI(
        `?friend_id=${this.$q.sessionStorage.getItem(
          'user_nickname'
        )}&content=mbti`
      );
      copy(`http://127.0.0.1:9000/#/${query}`);
      alert('링크가 클립보드에 공유되었어요!');
    },
  },
});
</script>
<style scoped></style>
