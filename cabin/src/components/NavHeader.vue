<template lang="html">
<header id="header">
  <h2>
    <router-link :to="{path: '/'}">GoCode</router-link>
  </h2>
  <nav class="links">
    <ul class="left-menu">
      <li>
        <router-link :to="{name: 'blogIndex'}">博客</router-link>
      </li>
      <li>
        <router-link :to="{name: 'blogAbout'}">关于</router-link>
      </li>
    </ul>
  </nav>
  <div class="main">
    <ul class="right-menu" v-show="showLogin">
      <li><a href="/#/login">登录</a></li>
    </ul>
    <ul class="right-menu" v-show="!showLogin" @mouseenter="onShowPanel" @mouseleave="onHidePanel">
      <!--li><a href="/#/u">{{getUsername}}</a></li-->
      <li>
        <router-link :to="{name: 'user', params: {user: getUsername}}" >
          <img  id="user-image" :src="getUserAvatar">
        </router-link>
      </li>
      <li v-show="showPanel">
        <div id="userpanel">
          <div id="usercard">
            <div id="userinfo">
              <img :src="getUserAvatar" >
              <div id="userctrls">
                <router-link :to="{name: 'user', params: {user: getUsername}}" >{{getUsername}}</router-link>
              </div>
            </div>
            <div id="userlogout">
              <a @click="doLogout">安全退出</a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</header>
</template>

<script>
import Headroom from 'headroom.js'
import { unique } from '@/assets/js/util.js';
import api from '@/assets/js/api.js'
import store from '@/assets/js/store.js'

export default {
  data () {
    return {
      tags: [],
      activeIndex: "1",
      user: {},
      showPanel: false
    }
  },
  methods: {
    onShowPanel() {
      this.showPanel = true
    },
    onHidePanel() {
      this.showPanel = false
    },
    doLogout() {
      let self = this
      api.postLogout(function(res) {
        if (res.success) {
          store.commit({
                type: "resetUser"
            })
          self.$message("您已安全退出")
        } else {
          self.$message.warning(res.error)
        }
      })
    }
  },
  computed: {
    showLogin() {
      let user = this.$store.state.userInfo
      if (user.uid == null || 0 == user.uid) {
        return true
      }
      return false
    },
    getUsername() {
      let user = this.$store.state.userInfo
      return user.username
    },
    getUserAvatar() {
      let user = this.$store.state.userInfo
      if ("" == user.avatar) {
        return "static/image/my.png"
      }
      return "static/image/" + user.avatar + ".png"
    }
  },
  mounted () {
  },
  created() {
    
  }
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: solid 1px rgba(160, 160, 160, .3);
  height: 3.5em;
  left: 0;
  line-height: 3.5em;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

#header .main {
  text-align: right;
}

#header .links {
  flex: 1;
  margin-left: 1.5em;
  overflow: hidden;
  padding-left: 1.5em;
}

#header ul.left-menu, ul.right-menu {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

#header ul.right-menu {
  margin-right: 32px;
  width: 40px;
  text-align: right;
}

#header .links ul {
  text-align: left;
}

#header .main ul {
  text-align: right;
}

#header ul.left-menu li {
  display: inline-block;
}

#header .links, #header .links ul li {
  border-left: solid 1px rgba(160, 160, 160, .3);
  line-height: 56px;
}

#userpanel {
  width: 300px;
  background: white;
  margin-left: -250px;
  /*right: 0;
  position: absolute;*/
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, .2);
  border-radius: 8px;
}

#usercard {
  padding: 24px;
  text-align: left;
}

#userinfo {
  display: flex;
  flex-direction: row;
}

#userctrls {
  margin-left: 20px;
}

#userinfo>img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid #fff;
}

#user-image {
  width: 24px;
  height: 24px;
  border: 2px solid #4d5559;
  border-radius: 50%;
}

#header h2 {
  height: 56px;
  line-height: 56px;
  padding-left: 24px;
  margin-top: 0px;
  margin-bottom: 16px;
}

#header nav {
  display: block;
  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 16px;
}

#header h2 a, #header .left-menu li a, .right-menu>li>a {
  font-size: 12px;
  border-bottom: 0;
  text-decoration: none;
  color: #3c3b3b;
  font-family: Releway, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 4px;
  margin-top: 0px;
}

.right-menu>li>a {
  letter-spacing: 4px;
}

.right-menu>li {
  width: 100%;
}

#header .links ul li a, #header .main ul li a {
  font-weight: 400;
}

#header .links ul li {
  line-height: 1;
  margin-left: 1em;
  padding-left: 1em;
}

#header .links ul li:first-child {
  border-left: 0;
  margin-left: 0;
  padding-left: 0;
}

#header .main ul li:last-child {
  margin-right: 1em;
}

a {
  transition: color .2s ease,border-bottom-color .2s ease;
}

a:hover {
  color: #2ebaae !important;
  border-bottom-color: transparent;
}

a:hover:before {
  color: #2ebaae !important;
}

#userinfo>a {
  color: #93999f;
  font: 14px;
  line-height: 21px;
}

#userlogout {
  height: 30px;
}

#userlogout>a, #userctrls>a {
  font-size: 12px;
  border-bottom: 0;
  text-decoration: none;
  color: #93999f;
  font-family: "微软雅黑", "宋体",sans-serif;
  margin-top: 0px;
}

#userlogout>a {
  cursor: pointer;
}

</style>
