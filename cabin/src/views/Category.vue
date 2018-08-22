<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <article-container v-for="article in articles" :summary="summary" :key="article.id" :articleId="article.articleId"></article-container>
      <pagination :next="showNext" :previous="showPrev" :page="curPage"></pagination>
    </div>
    <sidebar logoimg="../static/my.png"></sidebar>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import Sidebar from "@/components/Sidebar.vue";
import ArticleContainer from "@/components/ArticleContainer.vue";
import Pagination from '@/components/Pagination.vue'

export default {
  name: "Category",
  components: {
    NavHeader,
    Sidebar,
    ArticleContainer,
    Pagination
  },
  data: function() {
    return {
      articles: [],
      summary: true,
      curPage: 0,
      totalPage: 0
    };
  },
  computed: {
    showPrev: function() {
      if (this.curPage <= 0) {
        return false
      }
      return true
    },
    showNext: function() {
      if (this.curPage + 1 >= this.totalPage) {
        return false
      }
      return true
    },
    prevPage: function() {
      let pg = this.curPage - 1;
      return pg < 0 ? 0 : pg;
    },
    nextPage: function() {
      return this.curPage + 1;
    }
  },
  created: function() {
    this.curPage = this.$route.query.page;
    if (null == this.curPage) {
      this.curPage = 0;
    } else {
      // Convert to string
      this.curPage = parseInt(this.curPage);
    }
    console.log("page", this.$route.query.page);
    let self = this;
    this.$axios
      .get(
        "/api/article?mode=2&category=" +
          this.$route.params.id +
          "&limit=5&page=" +
          this.curPage
      )
      .then(function(response) {
        let body = JSON.parse(response.data.message);
        for (let item of body.articles) {
          self.articles.push({
            id: item.articleId,
            articleId: item.articleId
          });
        }
        self.totalPage = body.pages;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
ul.actions {
    display: flex;
    list-style: none;
    margin-left: -1em;
}

ul.actions>li a {
    text-decoration: none;
}

ul.actions>li:first-child {
    margin-right: 5px;
}

.button.disabled {
    pointer-events: none;
    color: rgba(160, 160, 160, .3) !important;
}
</style>
