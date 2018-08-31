import Router from 'vue-router'

import priv from '@/assets/js/privilege.js'

// First version
const Blog = resolve => require(['@/views/Blog'], resolve)
// Blog child router components
const BlogSummary = resolve => require(['@/components/Summary'], resolve)
const BlogArticle = resolve => require(['@/components/Article'], resolve)
const BlogArticleSubmit = resolve => require(['@/components/ArticleSubmit'], resolve)
const BlogAbout = resolve => require(['@/components/About'], resolve)
const BlogResumeEditor = resolve => require(['@/components/ResumeEditor'], resolve)
const BlogCategory = resolve => require(['@/components/Category'], resolve)
const BlogArticleEditor = resolve => require(['@/components/ArticleEditor'], resolve)
const BlogGuestbook = resolve => require(['@/components/Guestbook'], resolve)
// Login
const Login = resolve => require(['@/views/Login'], resolve)
// Register
const Register = resolve => require(['@/views/Register'], resolve)

export default new Router({
  routes: [
    {
      path: '/blog',
      component: Blog,
      children: [
        {
          path: '',
          name: "blogIndex",
          component: BlogSummary,
          meta: {}
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
          path: 'article', 
          name: "blogArticleSubmit", 
          component: BlogArticleSubmit,
          meta: {
            scrollToTop: true,
            privilege: priv.superAdmin
          }
        },
        {
          path: 'article/:id/editor',
          name: 'blogArticleEditor',
          component: BlogArticleEditor,
          meta: {
            privilege: priv.superAdmin
          }
        },
        {
          path: 'about', 
          name: "blogAbout", 
          component: BlogAbout
        },
        {
          path: 'about/resume/editor', 
          name: "blogResumeEditor", 
          component: BlogResumeEditor
        },
        {
          path: 'guestbook',
          name: 'blogGuestbook',
          component: BlogGuestbook
        },
        {
          path: 'category/:id', 
          name: "blogCategory", 
          component: BlogCategory
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/user",
      name: "user"
    },
    {
      path: "/error",
      name: "error"
    }
  ]
})
