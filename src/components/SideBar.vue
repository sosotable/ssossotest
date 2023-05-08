<template>
  <div class="side-bar-wrapper">
    <VueResizable
      class="resizable-side-bar"
      :width="500"
      :min-width="500"
      :max-width="Infinity"
      :active="['r']"
      v-if="isVisibleSideBar"
    >
      <div class="side-bar">
        <div class="title-area">
          <textarea
            id="idea"
            v-model="message"
            placeholder="의견을 입력하세요"
            style="width: 300px"
          ></textarea>
          <q-btn type="submit" @click="send">보내기</q-btn>
        </div>
      </div>
    </VueResizable>
    <BButton class="side-bar-active-btn" size="sm" @click="showSideBar">
      {{ isVisibleSideBar ? '💌' : '💌' }}
    </BButton>
  </div>
</template>

<script>
//import VueResizable from 'vue-resizable';

export default {
  name: 'SsossotestSideBar',
  data() {
    return {
      isVisibleSideBar: false,
    };
  },
  methods: {
    showSideBar() {
      this.isVisibleSideBar = !this.isVisibleSideBar;
    },
    send() {
      document.getElementById('idea').value = '';
      this.isVisibleSideBar = !this.isVisibleSideBar;
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar-wrapper {
  display: flex;
  color: black;

  > .resizable-side-bar {
    > .side-bar {
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 60px;
      z-index: 1;
      overflow: hidden;
      transition: all 0.5s ease;

      > .title-area {
        padding: 20px 10px;

        input,
        input::placeholder,
        input:focus {
          font-size: 2rem;
          font-weight: bold;
          color: #fff;
          box-shadow: none;
          background: none;
          border: none;
        }
      }
    }
  }

  > .side-bar-active-btn {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    border: none;
    border-radius: unset;
    color: black;
    opacity: 0.5;
    width: 40px;
    height: auto;
    z-index: 1;
  }
}
</style>

<!--<script>
export default {
  name: 'SsossotestSideBar',
};
</script>

<style scoped></style>-->
