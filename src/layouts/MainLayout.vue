<template>
  <q-layout class="flex column justify-center container" view="lHh Lpr lFf">
    <ssossotest-header />
    <q-page-container style="padding-top: 21px">
      <ssossotest-side-bar/>
      <router-view />
    </q-page-container>
    <ssossotest-footer />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SsossotestFooter from 'components/SsossotestFooter.vue';
import SsossotestHeader from 'components/SsossotestHeader.vue';
import SsossotestSideBar from 'components/SideBar.vue';
export default defineComponent({
  name: 'MainLayout',
  components: {
    SsossotestHeader,
    SsossotestFooter,
    SsossotestSideBar
  },
  setup() {
    return {};
  },
});
</script>
