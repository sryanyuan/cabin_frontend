<template>
    <div>
        <div id="breadcrumb-container">
            <div id="breadcrumbs">
                <span class="islink" @click="toCategory">{{article.category}}</span>
                <i class="el-icon-arrow-right seperator"></i>
                <span>{{article.title}}</span>
            </div>
        </div>
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
    methods: {
        toCategory() {
            this.$router.push({name: 'blogCategory', params: {id: this.article.categoryId}, query: {page: 0}})
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
    },
    props: []
}
</script>

<style scoped>
#breadcrumb-container {
    margin-bottom: 10px;
}

#breadcrumbs span.islink {
    font-weight: 700;
    cursor: pointer;
}

#breadcrumbs span {
    font-size: 14px;
    line-height: 1;
}

#breadcrumbs span.islink:hover {
  color: #2ebaae;
  transition: all 0.5s;
}

#breadcrumbs .seperator {
    margin: 0 6px;
    font-weight: 400;
    color: #c0c4cc;
    display: inline-block;
    vertical-align: baseline;
    font-size: 14px;
}
</style>
