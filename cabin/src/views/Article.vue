<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <article-container :summary="summary" :key="articleId" :articleId="articleId"></article-container>
    </div>
    <sidebar logoimg="../static/my.png"></sidebar>
  </div>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue"
import NavHeader from "@/components/NavHeader.vue"
import Sidebar from "@/components/Sidebar.vue"
export default {
    data: function() {
        return {
            articleId: this.$route.params.id,
            summary: false
        }
    },
    components: {
        ArticleContainer,
        NavHeader,
        Sidebar
    }
}
</script>

<style scoped>
#main {
  flex-grow: 1;
  width: 100%;
  display: block;
  max-width: 1000px;
}

#wrapper {
  display: flex;
  flex-direction: row-reverse;
  padding: 3em;
  flex-wrap: wrap;
  justify-content: center;
}
</style>