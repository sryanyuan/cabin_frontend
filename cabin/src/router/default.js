import Router from 'vue-router'

// First version
const Blog = resolve => require(['@/views/Blog'], resolve)
// Blog child router components
const BlogSummary = resolve => require(['@/components/Summary'], resolve)
const BlogArticle = resolve => require(['@/components/Article'], resolve)
const BlogAbout = resolve => require(['@/components/About'], resolve)
const BlogCategory = resolve => require(['@/components/Category'], resolve)
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
          meta: {
            privilege: 1
          }
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
