<template>
    <article class="post">
        <header>
            <div class="title">
                <template v-if="summary">
                    <h2>
                        <router-link :to="{name: 'article', params: {id: articleId}}">{{title}}</router-link>
                    </h2>
                </template>
                <template v-else>
                    <h2>
                        {{title}}
                    </h2>
                </template>
            </div>
            <div class="meta">
                <time class="published" :datetime="datetime">{{datetime}}</time>
                <span class="author"></span>
                <p>Read</p>
            </div>
        </header>
        <div id="postbody" v-html="content" v-highlight>
        </div>
        <footer v-if="summary">
            <ul class="actions">
                <li><a :href="getArticleURL" class="button big">阅读全文</a></li>
            </ul>
            <ul class="stats">
                <li>
                    <a :href="categoryUrl">{{category}}</a>
                </li>
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
        datetime: "",
        content: ""
    };
  },
  props: ["articleId", "summary"],
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
      this.title = ""
      this.content = ""
    // Pull config from api
    let url = "/api/article/" + this.articleId + "?summary=" + (this.summary ? "1" : "0");
    let self = this;
    this.$axios.get(url)
    .then(function (response) {
        let body = JSON.parse(response.data.message);
        self.title = body.title;
        self.content = body.content;
        self.category = body.category;
        self.datetime = body.postDatetime
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

header {
    display: flex;
    border-bottom: solid 1px rgba(160, 160, 160, .3);
    left: -3em;
    margin: -3em 0 3em;
    position: relative;
    width: calc(100% + 6em);
}

header .title {
    flex-grow: 1;
    padding: 3.75em 3em 3.3em;
    word-break: break-all;
}

header .title h2 {
    font-weight: 900;
    font-size: 1.5em;
    margin-top: 0;
    text-align: start;
}

header .title>:last-child, header .meta>:last-child {
    margin-bottom: 0;
}

header .meta {
    padding: 3.75em 3em 1.75em;
    min-width: 17em;
    text-align: right;
    width: 17em;
    border-left: solid 1px rgba(160, 160, 160, .3);
}

header .meta>* {
    margin: 0 0 1em;
}

header .meta p {
    opacity: .7;
    color: #000;
    font-size: .7em;
    line-height: 2.5;
    font-weight: 400;
}

header .meta .published {
    color: #3c3b3b;
    display: block;
    font-size: .7em;
    font-weight: 800;
    letter-spacing: .25em;
    margin-top: .5em;
    white-space: nowrap;
    text-size-adjust: 100%;
}

.author {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 0;
    font-size: .6em;
    font-weight: 400;
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
