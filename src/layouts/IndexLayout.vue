<template>
  <q-layout class="flex column justify-center container" view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <ssossotest-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SsossotestFooter from 'src/components/SsossotestFooter.vue';
export default defineComponent({
  name: 'IndexLayout',
  components: { SsossotestFooter },
  setup() {
    return {};
  },
});
</script>
