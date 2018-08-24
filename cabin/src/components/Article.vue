<template>
    <div>
        <article-container :summary="summary" :key="articleId" :articleId="articleId"></article-container>
        <comments></comments>
    </div>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue"
import Comments from '@/components/Comments.vue'

export default {
    data: function() {
        return {
            articleId: this.$route.params.id,
            summary: false
        }
    },
    components: {
        ArticleContainer,
        Comments
    },
    created() {
        window.scrollTo(0, 0)
    }
}
</script>

<style scoped>
</style>