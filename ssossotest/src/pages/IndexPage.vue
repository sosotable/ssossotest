<template>
  <q-page class="column items-center justify-center">
    <q-avatar rounded size="240px">
      <img src="src/assets/logo.png">
    </q-avatar>
    <div style="width: 100%; padding: 0 20% 0 25%">
      <q-input bottom-slots v-model="user_nickname" counter maxlength="16" >
        <template v-slot:hint>
          별명을 입력해주세요
        </template>
        <template v-slot:after>
          <q-btn round flat icon="send" @click="onSubmit()"/>
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    return {
      $q: useQuasar()
    };
  },
  data() {
    return {
      user_nickname: ''
    }
  },
  mounted() {
    // MARK: 사용자 세션 존재 시 main화면으로 라우팅
    if(this.$q.sessionStorage.has('user_nickname')) {
      this.$q.loading.show()
      setTimeout(()=>{
        this.$q.loading.hide()
        this.$router.push('/main')
      },500)
    }
  },
  methods: {
    onSubmit: function () {
      if(this.user_nickname !== '') {
        this.$q.sessionStorage.set('user_nickname', this.user_nickname)
        this.$router.push('/main')
      }

    }
  }
});
</script>
