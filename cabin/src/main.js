// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// axios
import axios from 'axios'

// highlight.js
//import hljs from 'highlight.js' // cdn
//import 'highlight.js/styles/github.css' // cdn

// font-awesome
//import 'font-awesome/css/font-awesome.css' // cdn

// custom files
import '@/assets/css/main.css'
import '@/assets/css/codehl.css'
//import '@/assets/css/media.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

// element-ui
import ElementUI from 'element-ui' // cdn
import 'element-ui/lib/theme-chalk/index.css' // cdn
Vue.use(ElementUI) // cdn

// Enable highlight.js
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll("pre code")
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

// Vuex
import store from '@/assets/js/store.js'

// Mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
