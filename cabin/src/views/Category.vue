<template>
  <div id="wrapper">
    <nav-header>Header</nav-header>
    <div id="main">
      <article-container v-for="article in articles" :summary="summary" :key="article.id" :articleId="article.articleId"></article-container>
      <pagination v-show="loaded" @gonext="gonext" @goprev="goprev" :category="category" :next="showNext" :previous="showPrev" :page="curPage"></pagination>
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
  methods: {
    gonext() {
      if (this.curPage + 1 >= this.totalPage) {
        return
      }
      this.curPage++;
      this.pullArticles()
    },
    goprev() {
      if (this.curPage - 1 < 0) {
        return
      }
      this.curPage--;
      this.pullArticles()
    },
    pullArticles() {
      this.loaded = false;
    let self = this;
    this.$axios
      .get(
        "/api/article?mode=2&category=" +
          this.category +
          "&limit=5&page=" +
          this.curPage
      )
      .then(function(response) {
        if (self.articles.length != 0) {
          self.articles = []
        }
        let body = JSON.parse(response.data.message);
        for (let item of body.articles) {
          self.articles.push({
            id: item.articleId,
            articleId: item.articleId
          });
        }
        self.totalPage = body.pages;
        window.scrollTo(0, 0)
        self.loaded = true
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    onPageCreated() {
      // First initialized
      if (0 == this.category) {
        this.category = this.$route.params.id
      }
      this.curPage = this.$route.query.page;
      if (null == this.curPage) {
        this.curPage = 0;
      } else {
        // Convert to int
        this.curPage = parseInt(this.curPage);
      }
      console.log("Category", this.category, "turn to page", this.curPage);
      this.pullArticles()
    }
  },
  created: function() {
    this.onPageCreated()
  },
  watch: {
    '$route' (to, from) {
      console.log(to, from)
      if (to.name != "category" ||
      from.name != "category") {
        return
      }
      // Get category id
      let toID = to.params.id
      // Recreate the category page
      this.category = toID
      this.onPageCreated()
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
