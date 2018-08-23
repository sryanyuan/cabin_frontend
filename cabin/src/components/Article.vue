<template>
    <article-container :summary="summary" :key="articleId" :articleId="articleId"></article-container>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue"
export default {
    data: function() {
        return {
            articleId: this.$route.params.id,
            summary: false
        }
    },
    components: {
        ArticleContainer
    },
    created() {
        window.scrollTo(0, 0)
    }
}
</script>

<style scoped>
</style>