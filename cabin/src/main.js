// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import hljs from "highlight.js"
import 'highlight.js/styles/github.css'

import 'font-awesome/css/font-awesome.css'
import '@/assets/css/main.css'
//import '@/assets/css/media.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(ElementUI)

// Enable highlight.js
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll("pre code")
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
