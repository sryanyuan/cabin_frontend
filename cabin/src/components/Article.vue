<template>
    <div>
        <article-container :summary="summary" :key="articleId" :articleId="articleId"></article-container>
        <comments :toWho="toWho" :uri="commentURI"></comments>
    </div>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue"
import Comments from '@/components/Comments.vue'
import api from '@/assets/js/api.js'

export default {
    data: function() {
        return {
            articleId: this.$route.params.id,
            summary: false,
            article: {},
            toWho: {}
        }
    },
    computed: {
        commentURI() {
            return "article:" + this.articleId
        }
    },
    components: {
        ArticleContainer,
        Comments
    },
    created() {
        window.scrollTo(0, 0)
        let self = this
        // Get the article author id and name to initialize comments
        api.getArticle(function(res) {
            if (res.success) {
                self.article = res.res
                self.toWho = {uid: self.article.authorId, name: self.article.authorName}
            } else {
                self.$message.warning(res.error)
            }
        }, this.articleId, 1)
    }
}
</script>

<style scoped>
</style>
