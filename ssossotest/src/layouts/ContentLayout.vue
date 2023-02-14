<template>
  <q-layout view="lHh Lpr lFf">
    <ssossotest-header/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <ssossotest-footer/>
  </q-layout>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SsossotestHeader from 'components/SsossotestHeader.vue';
import SsossotestFooter from 'components/SsossotestFooter.vue';
export default defineComponent({
  name: 'ContentLayout',
  components: {SsossotestFooter, SsossotestHeader},
  setup () {
    return {
    }
  }
});
</script>
