<template>
    <div>
      <article-container v-for="article in articles" :summary="summary" :key="article.id" :articleId="article.articleId"></article-container>
    </div>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue"
import {formatError} from '@/assets/js/util.js'
import api from '@/assets/js/api.js'

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
        api.getArticleIdsSummary(function(res) {
          if (res.success) {
            self.articles = res.res.articles;
          } else {
            self.$message.warning(res.error)
          }
        }, 0, 5)
      }
    },
    created: function() {
      this.pullArticleSummarys()
    }
}
</script>

<style scoped>
</style>
