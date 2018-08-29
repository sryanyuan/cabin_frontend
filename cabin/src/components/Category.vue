<template>
    <div id="main">
      <article-container v-for="article in articles" :summary="summary" :key="article.id" :articleId="article.articleId"></article-container>
      <pagination v-show="loaded" :category="category" :next="showNext" :previous="showPrev" :page="curPage"></pagination>
    </div>
</template>

<script>
import ArticleContainer from "@/components/ArticleContainer.vue";
import Pagination from "@/components/Pagination.vue";
import { formatError } from "@/assets/js/util.js";
import api from "@/assets/js/api.js";

export default {
    components: {
        ArticleContainer,
        Pagination
    },
    data: function() {
        return {
            loaded: false,
            category: 0,
            articles: [],
            summary: true,
            curPage: null,
            totalPage: 0
        };
    },
    computed: {
        showPrev: function() {
            if (this.curPage <= 0) {
                return false;
            }
            return true;
        },
        showNext: function() {
            if (this.curPage + 1 >= this.totalPage) {
                return false;
            }
            return true;
        },
        prevPage: function() {
            let pg = this.curPage - 1;
            return pg < 0 ? 0 : pg;
        },
        nextPage: function() {
            return this.curPage + 1;
        }
    },
    methods: {
        pullArticles() {
            this.loaded = false;
            let self = this;
            api.getArticleIdsByCategory(
                function(res) {
                    if (res.success) {
                        self.articles = res.res.articles;
                        self.totalPage = res.res.totalPage;
                        self.loaded = true;
                        window.scrollTo(0, 0);
                    } else {
                        self.$message.warning(res.error);
                    }
                },
                this.category,
                this.curPage,
                5
            );
        },
        onPageCreated() {
            // First initialized
            if (0 == this.category) {
                this.category = this.$route.params.id;
            }
            this.curPage = this.$route.query.page;
            if (null == this.curPage) {
                this.curPage = 0;
            } else {
                // Convert to int
                this.curPage = parseInt(this.curPage);
            }
            this.pullArticles();
        }
    },
    created: function() {
        this.onPageCreated();
    },
    watch: {
        $route(to, from) {
            if (to.name != "blogCategory" || from.name != "blogCategory") {
                return;
            }
            // Get category id
            let toID = to.params.id;
            // Recreate the category page
            this.category = toID;
            this.onPageCreated();
        }
    }
};
</script>

<style scoped>
ul.actions {
    display: flex;
    list-style: none;
    margin-left: -1em;
}

ul.actions > li a {
    text-decoration: none;
}

ul.actions > li:first-child {
    margin-right: 5px;
}

.button.disabled {
    pointer-events: none;
    color: rgba(160, 160, 160, 0.3) !important;
}
</style>
