<template>
    <article class="post">
        <div id="postbody" v-html="content" v-highlight>
        </div>
        <footer v-if="editable">
            <ul class="stats">
                <li><a href="#" class="icon fa fa-heart">{{like}}</a></li>
                <li><a href="#" class="icon fa fa-comment">{{comments}}</a></li>
            </ul>
        </footer>
        <footer v-else>
        </footer>
    </article>
</template>

<script>
export default {
  data: function() {
    return {
        title: "",
        url: "",
        datetime: "1970-01-01 00:00:00",
        content: ""
    };
  },
  props: ["editable"],
  computed: {
      getArticleURL: function() {
          return "/#/article/" + this.articleId
      }
  },
  created: function() {
      this.like = 0
      this.comments = 0
      this.category = ""
      this.categoryUrl = "/#/category"
      this.content = ""
    // Pull config from api
    let self = this;
    this.$axios.get("/api/about")
    .then(function (response) {
        let body = JSON.parse(response.data.message);
        self.content = body.resume;
    })
    .catch(function (error) {
        console.log(error)
    })
  }
};
</script>

<style scoped>
.post {
    margin: 0 0 2em;
    padding: 3em 3em 1em;
    position: relative;
    background: #fff;
    border: 1px solid rgba(160, 160, 160, .3);
}

a {
    text-decoration: none;
    color: rgb(0, 0, 0);
}

#postbody {
    text-align: left;
    font-family: 'YaHei Consolas Hybrid', Consolas, 'Meiryo UI';
    font-size: 14px;
}

footer {
    display: flex;
    align-items: center;
    text-align: start;
}

footer .actions {
    flex-grow: 1;
    list-style: none;
    cursor: default;
    padding-left: 0;
}

ul.actions li:last-child {
    padding-right: 0;
}

ul.actions li {
    display: inline-block;
    padding: 0 1.5em 0 0 ;
    vertical-align: middle;
}

.stats {
    opacity: .7;
    cursor: default;
    list-style: none;
    padding: 0;
    color: rgb(100, 100, 100);
}

.stats li {
    display: inline-block;
    font-size: .6em;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 0 2em;
    padding: 0 0 0 2em;
    border-left: solid 1px rgba(160, 160, 160, .3);
    padding-left: 2em;
}

.stats li:first-child {
    border-left: 0;
    margin-left: 0;
    padding-left: 0;
}

.stats li a:first-child {
    border-bottom: dotted 1px rgba(160, 160, 160, .65);
    color: inherit;
}

a.icon {
    position: relative;
    border-bottom: 0;
    color: inherit;
}

.icon:before {
    margin-right: .75em;
    color: rgba(160, 160, 160, .3);
}

</style>
