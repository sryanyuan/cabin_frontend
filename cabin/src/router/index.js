import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const Index = resolve => require(['@/views/Index'], resolve)
const Article = resolve => require(['@/views/Article'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Category = resolve => require(['@/views/Category'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {scrollToTop: true}
    },
    {
      name: "article",
      path: "/article/:id",
      component: Article,
      meta: {scrollToTop: true}
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {scrollToTop: true}
    },
    {
      path: "/category/:id",
      name: "category",
      component: Category,
      meta: {scrollToTop: true}
    }
  ]
})
