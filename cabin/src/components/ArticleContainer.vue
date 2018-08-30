<template>
    <article v-loading="loading" class="post">
        <header>
            <div class="title">
                <template v-if="summary">
                    <h2>
                        <i v-if="article.top" class="fa fa-pinterest-p pintag" aria-hidden="true"></i>
                        <router-link :to="{name: 'blogArticle', params: {id: articleId}}">{{article.title}}</router-link>
                    </h2>
                </template>
                <template v-else>
                    <h2>
                        {{article.title}}
                    </h2>
                </template>
            </div>
            <div class="meta">
                <time class="published" :datetime="article.datetime">{{article.datetime}}</time>
                <span class="author"></span>
                <p>Read</p>
            </div>
        </header>
        <div v-show="showCtrl" id="post-ctrls">
            <span class="sub-expand" @click="editArticle">编辑文章</span>
            <span class="sub-expand" @click="deleteArticle">删除文章</span>
            <span class="sub-expand" @click="topArticle">{{topArticleText}}</span>
            <a class="sub-expand" :href="getArticleDownloadLink">下载文章</a>
        </div>
        <div id="postbody" v-html="article.content" v-highlight>
        </div>
        <footer v-if="summary">
            <ul class="actions">
                <router-link :to="{name: 'blogArticle', params: {id: articleId}}" class="button">阅读全文</router-link>
            </ul>
            <ul class="stats">
                <li>
                    <router-link :to="{name: 'blogCategory', params: {id: article.categoryId}}">{{article.category}}</router-link>
                </li>
                <li><a href="#" class="icon fa fa-heart">{{article.like}}</a></li>
                <li><a href="#" class="icon fa fa-comment">{{article.comments}}</a></li>
            </ul>
        </footer>
        <footer v-else>
        </footer>
    </article>
</template>

<script>
import { formatError } from "@/assets/js/util.js";
import api from "@/assets/js/api.js";
import store from '@/assets/js/store.js'
import privilege from '@/assets/js/privilege.js'
import eventbus from '@/assets/js/eventbus.js'

export default {
    data: function() {
        return {
            article: {
                title: "",
                url: "",
                datetime: "",
                content: "",
                categoryId: 0,
                top: false
            },
            loading: true
        };
    },
    props: ["articleId", "summary"],
    computed: {
        showCtrl() {
            if (this.summary) {
                return false
            }
            if (store.state.userInfo.role >= privilege.superAdmin) {
                return true;
            }
            return false;
        },
        topArticleText() {
            if (this.article.top) {
                return "取消置顶"
            } else {
                return "置顶文章"
            }
        },
        getArticleDownloadLink() {
            return "/api/article/" + this.articleId + "/download"
        }
    },
    methods: {
        deleteArticle() {
            let self = this;
            this.$confirm("是否删除文章？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                self.doDeleteArticle();
            })
            .catch(() => {});
        },
        editArticle() {
            this.$router.push({name: "blogArticleEditor", params: {id: this.articleId}})
        },
        topArticle() {
            let self = this
            api.putArticleTop(function(res) {
                if (res.success) {
                    self.article.top = !self.article.top
                    self.$message.success(self.article.top ? "置顶成功" : "取消置顶成功")
                } else {
                    self.$message.warning(res.error)
                }
            }, this.articleId)
        },
        doDeleteArticle() {
            let self = this
            api.deleteArticle(function(response) {
                if (!response.success) {
                    self.$message.warning(response.error)
                } else {
                    eventbus.bus.$emit(eventbus.eventUpdateCategories)
                    self.$message.success("删除成功")
                    self.$router.back()
                }
            }, this.articleId)
        },
        pullArticle() {
            this.article = {
                title: "",
                url: "",
                datetime: "",
                content: "",
                categoryId: 0,
                top: false
            };
            this.loading = true;
            // Pull config from api
            let self = this;
            api.getArticle(
                function(response) {
                    self.loading = false;
                    if (response.success) {
                        self.article = response.res;
                    } else {
                        self.$message.warning(response.error);
                    }
                },
                this.articleId,
                this.summary ? 10 : 0
            );
        }
    },
    created: function() {
        this.pullArticle();
    }
};
</script>

<style scoped>
#post-ctrls {
    text-align: left;
    border-bottom: solid 1px rgba(160, 160, 160, 0.3);
    margin-left: -3em;
    margin-right: -3em;
    padding-left: 20px;
}

.post {
    margin: 0 0 2em;
    padding: 3em 3em 1em;
    position: relative;
    background: #fff;
    border: 1px solid rgba(160, 160, 160, 0.3);
}

a {
    text-decoration: none;
    color: rgb(0, 0, 0);
}

.pintag {
    margin-right: 2px;
}

header {
    display: flex;
    border-bottom: solid 1px rgba(160, 160, 160, 0.3);
    left: -3em;
    margin: -3em 0 0em;
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

header .title > :last-child,
header .meta > :last-child {
    margin-bottom: 0;
}

header .meta {
    padding: 3.75em 3em 1.75em;
    min-width: 17em;
    text-align: right;
    width: 17em;
    border-left: solid 1px rgba(160, 160, 160, 0.3);
}

header .meta > * {
    margin: 0 0 1em;
}

header .meta p {
    opacity: 0.7;
    color: #000;
    font-size: 0.7em;
    line-height: 2.5;
    font-weight: 400;
}

header .meta .published {
    color: #3c3b3b;
    display: block;
    font-size: 0.7em;
    font-weight: 800;
    letter-spacing: 0.25em;
    margin-top: 0.5em;
    white-space: nowrap;
    text-size-adjust: 100%;
}

.author {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 0;
    font-size: 0.6em;
    font-weight: 400;
}

#postbody {
    text-align: left;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
    font-size: 14px;
    margin-top: 3em;
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
    padding: 0 1.5em 0 0;
    vertical-align: middle;
}

.stats {
    opacity: 0.7;
    cursor: default;
    list-style: none;
    padding: 0;
    color: rgb(100, 100, 100);
}

.stats li {
    display: inline-block;
    font-size: 0.6em;
    font-weight: 400;
    line-height: 1;
    margin: 0 0 0 2em;
    padding: 0 0 0 2em;
    border-left: solid 1px rgba(160, 160, 160, 0.3);
    padding-left: 2em;
}

.stats li:first-child {
    border-left: 0;
    margin-left: 0;
    padding-left: 0;
}

.stats li a:first-child {
    border-bottom: dotted 1px rgba(160, 160, 160, 0.65);
    color: inherit;
}

a.icon {
    position: relative;
    border-bottom: 0;
    color: inherit;
}

.icon:before {
    margin-right: 0.75em;
    color: rgba(160, 160, 160, 0.3);
}

.sub-expand {
  margin-left: 8px;
  margin-right: 24px;
  font-size: 12px;
  color: #93999f;
  line-height: 32px;
  cursor: pointer;
}

.sub-expand:hover {
  color: black;
  transition: all 0.5s;
}
</style>
