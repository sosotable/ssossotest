<template>
  <q-layout view="lHh Lpr lFf">
    <ssossotest-header />
    <q-page-container>
      <router-view />
    </q-page-container>
    <ssossotest-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SsossotestFooter from 'components/SsossotestFooter.vue';
import SsossotestHeader from 'components/SsossotestHeader.vue';
export default defineComponent({
  name: 'MainLayout',
  components: {
    SsossotestHeader,
    SsossotestFooter,
  },
  setup() {
    return {};
  },
});
</script>
