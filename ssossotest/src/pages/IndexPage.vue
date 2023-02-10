<template>
  <q-page class="column items-center justify-center">
    <q-avatar rounded size="240px">
      <img src="src/assets/logo.png">
    </q-avatar>
    <div style="width: 100%; padding: 0 20% 0 25%">
      <q-input bottom-slots v-model="text" counter maxlength="16" >
        <template v-slot:hint>
          닉네임을 입력해주세요
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
      text: ''
    }
  },
  methods: {
    onSubmit: function () {
      // TODO: imple
    }
  }
});
</script>
