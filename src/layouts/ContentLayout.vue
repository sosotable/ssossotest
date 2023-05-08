<template>
  <q-layout view="lHh Lpr lFf" class="flex justify-center container">
    <ssossotest-header />
    <q-page-container style="padding: 0!important;">
      <router-view />
    </q-page-container>
    <ssossotest-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SsossotestHeader from 'components/SsossotestHeader.vue';
import SsossotestFooter from 'components/SsossotestFooter.vue';
export default defineComponent({
  name: 'ContentLayout',
  components: { SsossotestFooter, SsossotestHeader },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
