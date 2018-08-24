<template>
    <div id="comment-item">
        <div id="reply-main">
            <div id="reply-img-container">
                <a href="#">
                    <img id="replier-image" src="static/image/my.png">
                </a>
            </div>
            <div id="reply-content-container">
                <a href="#">{{reply.name}}</a>
                <div>
                    <p>{{reply.content}}</p>
                </div>
            </div>
        </div>
        <div id="reply-actions">
            <span class="reply-block-button" @click="onAgree"><i class="fa fa-thumbs-up"></i><em>{{agreeContent}}</em></span>
            <span class="reply-block-button"><i class="fa fa-thumbs-down"></i><em>{{opposeContent}}</em></span>
            <span class="sub-expand" @click="doExpand">{{expandText}}</span>
            <span class="reply-time">{{reply.time}}</span>
        </div>
        <div v-show="expand" id="sub-replys">
            <comment-sub-item v-for="(item, index) in reply.subs" :reply=item :key="item.id" :floorIndex="index"></comment-sub-item>
        </div>
    </div>
</template>

<script>
import CommentSubItem from '@/components/CommentSubItem.vue'

export default {
    data: function() {
        return {
            replys: [

            ],
            expand: false
        }
    },
    components: {
        CommentSubItem
    },
    methods: {
        onAgree: function() {
            console.log("agree")
        },
        doExpand: function() {
            this.expand = !this.expand
        }
    },
    computed: {
        replyCount: function() {
            return this.replys.length
        },
        agreeContent: function() {
            if (0 == this.reply.agree) {
                return "赞同"
            }
            return this.reply.agree
        },
        opposeContent: function() {
            if (0 == this.reply.oppose) {
                return "反对"
            }
            return this.reply.oppose
        },
        expandText: function() {
            if (this.expand) {
                return "收起回复"
            }
            if (null == this.reply.subs || this.reply.subs.length == 0) {
                return "展开回复"
            }
            return this.reply.subs.length + "条回复"
        }
    },
    props: ["reply"]
}
</script>

<style scoped>
#sub-replys {
    margin-top: 20px;
}

.reply-block-button {
    display: inline-block;
    height: 32px;
    margin-right: 16px;
    padding: 0 12px;
    border: 1px solid #d9dde1;
    border-radius: 2px;
    color: #93999f;
    box-sizing: border-box;
    line-height: 32px;
    cursor: pointer;
}

.reply-time {
    flex-grow: 1;
    font-size: 12px;
    color: #93999f;
    line-height: 32px;
    text-align: right;
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
}

.reply-block-button:hover {
    color: black;
    border: 1px solid black;
}

#comment-item {
    padding: 24px 25px;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    border-bottom: 1px solid #d9dde1;
}

#reply-main {
    display: flex;
    flex-direction: row;
    justify-content: start;
}

#reply-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 78px;
    padding-top: 12px;
}

#reply-info {
    display: flex;
    flex-direction: row;
    justify-content:flex-end
}

#reply-actions em {
    padding-left: 6px;
    font-weight: 400px;
    font-family: "黑体","宋体",sans-serif;
    font-style: normal;
    font-size: 12px;
}

#reply-img-container {
    width: 48px;
    height: 48px;
}

#replier-image {
    border-radius: 50%;
    width: 100%;
    height: 100%;
}

#reply-content-container {
    margin-left: 30px;
    text-align: left;
}

#reply-content-container>a {
    text-decoration: none;
    color: #93999f;
    font-size: 14px;
    line-height: 24px;
}

#reply-content-container p {
    margin-top: 2px;
    margin-bottom: 0px;
}
</style>
