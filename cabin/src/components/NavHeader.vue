<template lang="html">
<header id="header">
  <h1>
    <router-link :to="{path: '/'}">GoCode</router-link>
  </h1>
  <nav class="links">
    <ul>
      <li>
        <router-link :to="{name: 'about'}">关于</router-link>
      </li>
    </ul>
  </nav>
  <nav class="main">
    <ul>
      <li><a href="/#/login">登陆</a></li>
    </ul>
  </nav>
</header>
</template>

<script>
// 实现导航条的自动显示
import Headroom from 'headroom.js'
import { unique } from '@/assets/js/util.js';
import axios from 'axios'
export default {
  data () {
    return {
      tags: [],
      activeIndex: "1"
    }
  },
  methods: {
    getTags () {
      axios.get("/api/articleTags").then((result)=>{
        let res = result.data
        if (res.status == '0') {
          this.tags = res.result
          this.tags = unique(this.tags)
          this.$emit('shareTags', this.tags)
        } else {
          this.tags = ["未获取到数据"]
        }
      })
    },
    getOne (tag) {
      this.$emit('shareOne', tag)
      this.$router.push({path:'/blog'})
    }
  },
  mounted () {
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
  z-index: 10000;
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

#header ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

#header .links ul {
  text-align: left;
}

#header .main ul {
  text-align: right;
}

#header ul li {
  display: inline-block;
}

#header .links, #header .links ul li {
  border-left: solid 1px rgba(160, 160, 160, .3);
  line-height: 56px;
}

#header h1 {
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

#header h1 a, #header li a {
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

</style>