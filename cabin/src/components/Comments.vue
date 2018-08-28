<template>
    <div>
        <reply-container :toWho="toWho" :subRefId="subRefId" :uri="uri" @updateReply="updateReply"></reply-container>
        <div id="comment-count"><h3>{{replyCount}} 条评论</h3></div>
        <comment-item v-for="item in replys" :reply="item" :key="item.id" :uri="uri"
         @updateReply="updateSubReply" @deleteComment="deleteComment">

        </comment-item>
    </div>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'
import ReplyContainer from '@/components/ReplyContainer.vue'
import api from '@/assets/js/api.js'

export default {
    data: function() {
        return {
            subRefId: 0,
            replys: []
        }
    },
    components: {
        CommentItem,
        ReplyContainer
    },
    computed: {
        replyCount: function() {
            return this.replys.length
        }
    },
    methods: {
        updateReply() {
            this.pullReplys()
        },
        updateSubReply(subRefId) {
            let self = this
            api.getComment(function(res) {
                if (!res.success) {
                    self.$message.warning(res.error)
                } else {
                    // Find parent and update subs
                    let parent = null
                    for (let cm of self.replys) {
                        if (cm.id == subRefId) {
                            parent = cm
                            break
                        }
                    }
                    if (null == parent) {
                        self.$message.warning("Can't find parent comment")
                        return
                    }
                    parent.subs = res.res.subs
                }
            }, this.uri, subRefId)
        },
        pullReplys() {
            let self = this
            api.getComments(function(res) {
                if (!res.success) {
                    self.$message.warning(res.error)
                } else {
                    self.replys = res.res.replys
                }
            }, this.uri)
        },
        deleteComment(commentId) {
            let final = []
            for (let reply of this.replys) {
                if (reply.id == commentId) {
                    continue
                }
                final.push(reply)
            }
            this.replys = final
        }
    },
    props: ["uri", "toWho"],
    created() {
        this.pullReplys()
    }
}
</script>

<style scoped>
#comment-count {
    text-align: left;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

#comment-count>h3 {
    padding-left: 24px;
    color: #07111b;
    font-size: 16px;
    margin-top: 12px;
    line-height: 64px;
    border-bottom: 1px solid #d9dde1;
}
</style>
