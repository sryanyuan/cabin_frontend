<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <router-view></router-view>
    </div>
    <sidebar logoimg="../static/my.png"></sidebar>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue"
import Sidebar from "@/components/Sidebar.vue"
import ArticleContainer from "@/components/ArticleContainer.vue"
export default {
    name: "Index",
    components: {
        NavHeader,
        Sidebar,
        ArticleContainer
    },
    data: function() {
      return {
      }
    },
    created: function() {
    }
}
</script>

<style scoped>
</style>
