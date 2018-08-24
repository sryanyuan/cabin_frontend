<template>
  <el-container id="wrapper">
    <nx-nav-header>Header</nx-nav-header>
    <el-main id="main">
      <router-view></router-view>
    </el-main>
    <nx-sidebar></nx-sidebar>
  </el-container>
</template>

<script>
import NxNavHeader from "@/components/nx/NavHeader.vue"
import NxSidebar from "@/components/nx/Sidebar.vue"
import ArticleContainer from "@/components/ArticleContainer.vue"
export default {
    name: "Index",
    components: {
        NxNavHeader,
        NxSidebar,
        ArticleContainer,
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
