<template>
  <q-page class="row items-center justify-evenly absolute-top">
    <div class="row items-start">
      <q-card class="my-card" flat bordered>
        <q-card-section style="width: 300px">
          <div class="text-orange-9 text-center" style="height: 50px"/>
          <div class="q-ma-lg text-center text-h6">
            <div v-if="friendResult">
              <div v-if="ownerName !== undefined">
                친구 {{ this.ownerName }}님의 취향
              </div>
              <div v-else>
                친구의 취향
              </div>
            </div>
            <div v-else>
              <div v-if="this.userName !== undefined">
                {{ this.userName }}님의 취향
              </div>
              <div v-else>
                당신의 취향
              </div>
            </div>

            <div class="q-ma-lg">
              💌
            </div>

            <div v-if="friendResult" class="q-ma-lg text-subtitle1 text-deep-orange-10">
              점수 {{this.score}}/{{resultFriend.length}}
              <q-separator />
            </div>
          </div>
          <div class="q-pa-none col">
            <q-list
              bordered
              separator
              style="margin-bottom: 50px; border-radius: 10px">
              <q-item-section
                v-if="friendResult">
                <div class="question-div">
                  예시
                </div>
                <div class="answer-div selected-div">
                  <div class="selected-mark-div">
                    ⭕
                  </div>
                  <div class="selected-answer-div">
                    ← 친구가 고른 정답
                  </div>
                  <div class="selected-mark-div">

                  </div>
                </div>
                <div class="answer-div selected-div">
                  <div class="selected-mark-div">

                  </div>
                  <div class="selected-answer-div text-weight-medium">
                    내가 고른 오답 →
                  </div>
                  <div class="selected-mark-div">
                    ❌
                  </div>
                </div>
              </q-item-section>
            </q-list>


            <q-list
              bordered
              separator
              v-for="(model, index) in tasteModel"
              :key="index"
              class="my-card"
              style="margin-bottom: 30px; border-radius: 10px"
            >
              <q-item-section>
                <!-- 질문 -->
                <div class="question-div">
                  {{ model.question[0] }}
                </div>
                <div v-if="friendResult" class="compare-div">
                  <div v-if="resultFriend[index] === resultList[index]">
                    정답입니다!
                  </div>
                  <div v-else>
                    틀렸습니다.
                  </div>

                </div>

                <!-- 답변 -->
                <div
                  v-for="i in tasteModel[index].answer.length"
                  :key="i"
                  class="answer-div"
                >
                  <!-- 친구 답변 -->
                  <div v-if="friendResult">
                    <!-- 맞았을 때 -->
                    <div v-if="resultFriend[index] === resultList[index]">
                      <div v-if="i === resultList[index] + 1"
                           class="selected-div">
                        <div class="selected-mark-div">
                          ⭕
                        </div>
                        <div class="selected-answer-div">
                          {{tasteModel[index].answer[i - 1].answer}}
                        </div>
                        <div class="selected-mark-div">
                        </div>
                      </div>
                      <div v-else>
                        {{tasteModel[index].answer[i - 1].answer}}
                      </div>
                    </div>

                    <!-- 틀렸을 때-->
                    <div v-else>
                      <!-- 친구 정답-->
                      <div v-if="i === resultFriend[index] + 1"
                           class="selected-div">
                        <div class="selected-mark-div">
                          ⭕
                        </div>
                        <div class="selected-answer-div">
                          {{tasteModel[index].answer[i - 1].answer}}
                        </div>
                        <div class="selected-mark-div">
                        </div>
                      </div>

                      <!-- 내가 고른 답-->
                      <div v-else-if="i === resultList[index] + 1"
                           class="selected-div">
                        <div class="selected-mark-div">
                        </div>
                        <div class="selected-answer-div text-weight-medium">
                          {{tasteModel[index].answer[i - 1].answer}}
                        </div>
                        <div class="selected-mark-div">
                          ❌
                        </div>
                      </div>
                      <div v-else>
                        {{tasteModel[index].answer[i - 1].answer}}
                      </div>
                    </div>
                  </div>

                  <!-- 테스트 생성 -->
                  <div v-else>
                    <div v-if="i === resultList[index] + 1"
                    class="selected-div">
                      <div class="selected-mark-div">

                      </div>
                      <div class="selected-answer-div">
                        {{tasteModel[index].answer[i - 1].answer}}
                      </div>
                      <div class="selected-mark-div">
                        ✔
                      </div>

                    </div>
                    <div v-else>
                      {{tasteModel[index].answer[i - 1].answer}}
                    </div>
                  </div>
                </div>

              </q-item-section>

            </q-list>

          </div>
        </q-card-section>
        <q-separator />
        <router-link to="/main" style="width: 100%">
          <q-btn flat color="dark" style="width: 100%" label="처음으로" />
        </router-link>
        <q-separator />
        <q-btn
          flat
          color="dark"
          @click="copyLink"
          style="width: 100%;  margin-bottom: 100px"
          label="친구에게 공유하기"
        />
      </q-card>
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
    let userName: any = null;
    let ownerName: any = null;
    let score: number | any = 0;
    return {
      tasteModel,
      userName,
      ownerName,
      score
    };
  },
  data() {
    return {
      title: '',
      desc: '',
      image: '',
      selected: '',
      friendResult: false,
      // MARK: undefined error 발생하여 임시로 answer key 넣어 줌
      resultList: [{ answer: '' }],
      result: [] /** 링크 받은 사용자의 선택 결과 **/,
      resultFriend: [] /**링크 공유한 친구의 결과**/,
    };
  },
  // MARK: 페이지 라우팅 시 받아진 쿼리스트링 처리
  mounted() {
    this.userName = String(decodeURI(String(this.$route.query.id)));
    console.log("userName: "+this.userName)

    if (this.$route.query.friend_id === undefined) {
      if (this.$route.query.result != null) {
        const resultQuery: string | any = this.$route.query.result;
        // MARK: 쿼리스트링 디코딩
        this.resultList = JSON.parse(decodeURI(resultQuery));
      }
    }
    else {
      if (this.$route.query.result != null) {
        console.log("친구!!!!!!!!")
        this.friendResult = true;
        const resultQuery: string | any = this.$route.query.result;
        const friendQuery: string | any = this.$route.query.friend_result;
        const ownerNameQuery: string | any = this.$route.query.friend_id;
        const scoreQuery: string | any = this.$route.query.score;
        // MARK: 쿼리스트링 디코딩

        this.resultList = JSON.parse(decodeURI(resultQuery));
        this.resultFriend = JSON.parse(decodeURI(friendQuery));
        this.ownerName = String(decodeURI(ownerNameQuery));
        this.score = String(decodeURI(scoreQuery));
        console.log("score: "+this.score)
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
      };
      const query = (
        `?friend_id=${this.$route.query.id}&content=tastes&friend=${this.$route.query.result}`
      );
      copy(`http://localhost:9100/${query}`);
      alert('링크가 클립보드에 공유되었어요!');
    },
  },
});
</script>

<style scoped>
.question-div{
  background-color: #ffe5a6;
  padding: 4px;
  text-align: center;
  font-size: larger;
}
.answer-div{
  padding: 10px;
  text-align: center;
  color: #505050;
}
.selected-div{
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-weight: bold;
}
.selected-answer-div{
  text-align: center;
  color: #000000;
}
.selected-mark-div{
  width: 30px;
  color: #ff7300;
}
.compare-div{
  color: #f57c00;
  margin: 3px;
}
</style>
