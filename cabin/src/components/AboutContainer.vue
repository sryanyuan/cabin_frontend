<template>
    <article class="post" v-loading="loading">
        <div v-show="showCtrl" id="post-ctrls">
            <span class="sub-expand" @click="editResume">编辑简历</span>
            <a class="sub-expand" href="/api/resume/download">下载简历</a>
        </div>
        <div id="postbody" v-html="content" v-highlight class="codehl"></div>
    </article>
</template>

<script>
import api from '@/assets/js/api.js'
import privcheck from '@/assets/js/privcheck.js'

export default {
    data: function () {
        return {
            loading: true,
            content: ""
        };
    },
    methods: {
      editResume() {
        this.$router.push({name: "blogResumeEditor"})
      }
    },
    props: [],
    computed: {
        showCtrl() {
            return privcheck.isSuperAdmin()
        },
    },
    created: function () {
        this.content = ""
        this.loading = true
        // Pull config from api
        let self = this;

        api.getAbout(function(res) {
            self.loading = false
            if (res.success) {
                self.content = res.res.resume
            } else {
                self.$message.warning(res.error)
            }
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
  border: 1px solid rgba(160, 160, 160, 0.3);
}

a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

#postbody {
  text-align: left;
  font-family: "YaHei Consolas Hybrid", Consolas, "Meiryo UI";
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

#post-ctrls {
    text-align: left;
    border-bottom: solid 1px rgba(160, 160, 160, 0.3);
    margin-left: -3em;
    margin-right: -3em;
    margin-top: -3em;
    margin-bottom: 3em;
    padding-left: 20px;
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
