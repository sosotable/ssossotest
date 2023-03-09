import { boot } from 'quasar/wrappers'

import ga from './analytics'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router}) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, 'G-00B6BM1P0J')
  })
})
