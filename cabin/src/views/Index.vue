<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <article-container v-for="article in articles" :summary="summary" :key="article.id" :articleId="article.articleId"></article-container>
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
        articles: [],
        summary: true
      }
    },
    created: function() {
      console.log("articles", this.articles)
      let self = this
      this.$axios.get("/api/article?mode=0&limit=5")
      .then(function (response) {
        let body = JSON.parse(response.data.message)
        for (let item of body.articles) {
          self.articles.push({
            id: item.articleId,
            articleId: item.articleId
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
