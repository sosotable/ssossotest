<template>
  <q-page class="row items-center justify-center absolute-top">
    <div class="row items-start">
      <q-card   flat bordered>
        <q-card-section class="content-card">
          <div class="text-orange-9 text-center" style="height: 50px" />
          <div class="result-page">
            <div class="q-ma-lg text-center text-h6">
              <div v-if="friendResult">
                <div v-if="ownerName !== undefined">
                  친구 {{ this.ownerName }}님의 취향
                </div>
                <div v-else>친구의 취향</div>
              </div>
              <div v-else>
                <div v-if="this.userName !== undefined">
                  {{ this.userName }}님의 취향
                </div>
                <div v-else>당신의 취향</div>
              </div>

              <div class="q-ma-lg">💌</div>

              <div v-if="friendResult">
                <div class="q-ma-lg text-subtitle1 text-deep-orange-10">
                  점수 {{ this.score }}/{{ resultFriend.length }}
                </div>
                <q-separator />

                <div class="q-ma-lg">🏆 Ranking 🏆</div>
                <q-list
                  bordered
                  separator
                  v-for="(model, index) in rankModel"
                  :key="index"
                  class="my-card"
                  style="margin-bottom: 30px; border-radius: 10px"
                >
                  <q-item-section>
                    <div
                      class="q-pa-xs text-subtitle1 selected-div"
                      style="font-weight: normal"
                    >
                      <div>{{ index + 1 }}등</div>
                      <div>
                        {{ model.name }}
                      </div>
                      <div>{{ model.score }}점</div>
                    </div>
                  </q-item-section>
                </q-list>
              </div>
            </div>
            <div class="q-pa-none col" style="max-height: 60vh; overflow: auto">
              <q-list
                bordered
                separator
                style="margin-bottom: 50px; border-radius: 10px"
              >
                <q-item-section v-if="friendResult">
                  <div class="question-div">예시</div>
                  <div class="answer-div selected-div">
                    <div class="selected-mark-div">⭕</div>
                    <div class="selected-answer-div">← 친구가 고른 정답</div>
                    <div class="selected-mark-div"></div>
                  </div>
                  <div class="answer-div selected-div">
                    <div class="selected-mark-div"></div>
                    <div class="selected-answer-div text-weight-medium">
                      내가 고른 오답 →
                    </div>
                    <div class="selected-mark-div">❌</div>
                  </div>
                </q-item-section>
              </q-list>

              <q-list
                bordered
                separator
                v-for="(model, index) in tasteModel"
                :key="index"
                class="my-card-taste"
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
                    <div v-else>틀렸습니다.</div>
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
                        <div
                          v-if="i === resultList[index] + 1"
                          class="selected-div"
                        >
                          <div class="selected-mark-div">⭕</div>
                          <div class="selected-answer-div">
                            {{ tasteModel[index].answer[i - 1].answer }}
                          </div>
                          <div class="selected-mark-div"></div>
                        </div>
                        <div v-else>
                          {{ tasteModel[index].answer[i - 1].answer }}
                        </div>
                      </div>

                      <!-- 틀렸을 때-->
                      <div v-else>
                        <!-- 친구 정답-->
                        <div
                          v-if="i === resultFriend[index] + 1"
                          class="selected-div"
                        >
                          <div class="selected-mark-div">⭕</div>
                          <div class="selected-answer-div">
                            {{ tasteModel[index].answer[i - 1].answer }}
                          </div>
                          <div class="selected-mark-div"></div>
                        </div>

                        <!-- 내가 고른 답-->
                        <div
                          v-else-if="i === resultList[index] + 1"
                          class="selected-div"
                        >
                          <div class="selected-mark-div"></div>
                          <div class="selected-answer-div text-weight-medium">
                            {{ tasteModel[index].answer[i - 1].answer }}
                          </div>
                          <div class="selected-mark-div">❌</div>
                        </div>
                        <div v-else>
                          {{ tasteModel[index].answer[i - 1].answer }}
                        </div>
                      </div>
                    </div>

                    <!-- 테스트 생성 -->
                    <div v-else>
                      <div
                        v-if="i === resultList[index] + 1"
                        class="selected-div"
                      >
                        <div class="selected-mark-div"></div>
                        <div class="selected-answer-div">
                          {{ tasteModel[index].answer[i - 1].answer }}
                        </div>
                        <div class="selected-mark-div">✔</div>
                      </div>
                      <div v-else>
                        {{ tasteModel[index].answer[i - 1].answer }}
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </q-list>
            </div>
          </div>
        </q-card-section>
        <div style="margin-bottom: 50px">
          <q-separator />
          <router-link to="/main" style="width: 100%">
            <q-btn flat color="dark" style="width: 100%" label="처음으로" />
          </router-link>
          <q-separator />
          <q-btn
            v-if="!friendResult"
            flat
            color="dark"
            @click="copyLink"
            style="width: 100%"
            label="친구에게 나의 취향 테스트 공유하기"
          />
          <q-separator />
        </div>


      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { tasteModel } from 'src/assets/tasteContentModel';
import { response } from 'express';

export default defineComponent({
  name: 'TastesResultPage',
  setup() {
    let userName: any = null;
    let ownerName: any = null;
    let score: number | any = 0;
    let rankModel: any = null;

    return {
      tasteModel,
      userName,
      ownerName,
      score,
      rankModel,
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
    if (this.$route.query.friend_id === undefined) {
      if (this.$route.query.result != null) {
        const resultQuery: string | any = this.$route.query.result;
        // MARK: 쿼리스트링 디코딩
        this.resultList = JSON.parse(decodeURI(resultQuery));
      }
    } else {
    /**
     * MARK: 공유받아서 들어온 경우 성적값 db 추가
     * 새로운 성적값 처리 후 성적값들 db에서 불러와서 랭킹 매기는 식으로 하면 될 것 같아요
     */
      if (this.$route.query.result != null) {
        // MARK: 기존 평가정보 확인
        axios
          .post(String(process.env.DAO_ENDPOINT), {
            DML: 'SELECT',
            columns: '*',
            table: 'tastes_score',
            where: `from_key = '${
              this.$route.query.friend_key
            }' and to_key = '${this.$q.sessionStorage.getItem('user_key')}'`,
          })
          .then((response) => {
            // MARK: 기존 평가정보가 존재하는 경우 => UPDATE
            if (response.data.length > 0) {
              axios.post(String(process.env.DAO_ENDPOINT), {
                DML: 'UPDATE',
                table: 'tastes_score',
                set: `score = ${String(
                  decodeURI(String(this.$route.query.score))
                )}`,
                where: `from_key = '${
                  this.$route.query.friend_key
                }' and to_key = '${this.$q.sessionStorage.getItem(
                  'user_key'
                )}'`,
              });
            }
            // MARK: 기존 평가정보가 존재하지 않는 경우 => INSERT
            else {
              axios
                .post(String(process.env.DAO_ENDPOINT), {
                  DML: 'INSERT',
                  table: 'tastes_score',
                  columns:
                    'from_key, to_key, from_nickname, to_nickname, score',
                  values: `'${this.$route.query.friend_key}',
            '${this.$q.sessionStorage.getItem('user_key')}',
            '${String(decodeURI(String(this.$route.query.friend_id)))}',
            '${this.$q.sessionStorage.getItem('user_nickname')}',
            ${String(decodeURI(String(this.$route.query.score)))}`,
                })
                .then((response) => {
                  this.friendResult = true;
                  const resultQuery: string | any = this.$route.query.result;
                  const friendQuery: string | any =
                    this.$route.query.friend_result;
                  const ownerNameQuery: string | any =
                    this.$route.query.friend_id;
                  const scoreQuery: string | any = this.$route.query.score;
                  // MARK: 쿼리스트링 디코딩
                  this.resultList = JSON.parse(decodeURI(resultQuery));
                  this.resultFriend = JSON.parse(decodeURI(friendQuery));
                  this.ownerName = String(decodeURI(ownerNameQuery));
                  this.score = String(decodeURI(scoreQuery));
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        axios
          .post(String(process.env.DAO_ENDPOINT), {
            DML: 'SELECT',
            columns: 'to_nickname AS name, score',
            table: 'tastes_score',
            where: `from_key = '${this.$route.query.friend_key}' ORDER BY score DESC`,
          })
          .then((response) => {
            console.log(response.data);
            this.rankModel = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
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
      const query = `?friend_id=${
        this.$route.query.id
      }&friend_key=${this.$q.sessionStorage.getItem(
        'user_key'
      )}&content=tastes&friend=${this.$route.query.result}`;
      // MARK: 현재 모드가 개발 모드인지 배포 모드인지 확인하여 해당 주소값 복사
      if (process.env.NODE_ENV == 'development') {
        copy(`http://localhost:9100${query}`);
      }
      // MARK: process.env.NODE_ENV == 'production'
      else {
        copy(`http://ssossotest.com${query}`);
      }
      alert('링크가 클립보드에 공유되었어요!');
    },
  },
});
</script>

<style scoped>
.question-div {
  background-color: #ffe5a6;
  padding: 4px;
  text-align: center;
  font-size: larger;
}
.answer-div {
  padding: 10px;
  text-align: center;
  color: #505050;
}
.selected-div {
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-weight: bold;
}
.selected-answer-div {
  text-align: center;
  color: #000000;
}
.selected-mark-div {
  width: 30px;
  color: #ff7300;
}
.compare-div {
  color: #f57c00;
  margin: 3px;
}
</style>
