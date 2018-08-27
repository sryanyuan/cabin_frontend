/*import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// First version
const Blog = resolve => require(['@/views/Blog'], resolve)
// Blog child router components
const BlogSummary = resolve => require(['@/components/Summary'], resolve)
const BlogArticle = resolve => require(['@/components/Article'], resolve)
const BlogAbout = resolve => require(['@/components/About'], resolve)
const BlogCategory = resolve => require(['@/components/Category'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/blog',
      component: Blog,
      children: [
        {
          path: '',
          name: "blogIndex",
          component: BlogSummary
        },
        {
          path: 'article/:id', 
          name: "blogArticle", 
          component: BlogArticle,
          meta: {
            scrollToTop: true
          }
        },
        {
          path: 'about', 
          name: "blogAbout", 
          component: BlogAbout
        },
        {
          path: 'category/:id', 
          name: "blogCategory", 
          component: BlogCategory
        }
      ]
    }
  ]
})
*/

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import router from '@/router/default.js'
//import router from '@/router/nx.js'

import interceptor from '@/router/interceptor.js'
interceptor.beforeEach(router)

export default router
