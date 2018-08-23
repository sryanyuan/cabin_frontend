<template>
    <div>
      <article-container v-for="article in articles" :summary="summary" :key="article.id" :articleId="article.articleId"></article-container>
    </div>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue"
import {formatError} from '@/assets/js/util.js'
export default {
    name: "Summary",
    components: {
        ArticleContainer
    },
    data: function() {
      return {
        loading: true,
        articles: [],
        summary: true
      }
    },
    methods: {
      pullArticleSummarys: function() {
        let self = this
        self.articles = []
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
          self.$message.warning(formatError(error))
        })
      }
    },
    created: function() {
      this.pullArticleSummarys()
    }
}
</script>

<style scoped>
</style>
