<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <article-container v-for="article in articles" summary=true :key="article.id" :categoryId="article.category" :articleId="article.categoryId"></article-container>
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
        articles: [
          {id: 1, articleId: 1, categoryId: 1}
        ]
      }
    }
}
</script>

<style scoped>
#main {
  flex-grow: 1;
  width: 100%;
  display: block;
}

#wrapper {
  display: flex;
  flex-direction: row-reverse;
}
</style>