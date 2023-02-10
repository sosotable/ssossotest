<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <ssossotest-footer/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SsossotestFooter from 'components/SsossotestFooter.vue';
export default defineComponent({
  name: 'ContentLayout',
  components: {SsossotestFooter},
  setup () {
    return {
    }
  }
});
</script>
