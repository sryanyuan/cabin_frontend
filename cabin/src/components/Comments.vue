<template>
    <div>
        <div id="comment-count"><h3>{{replyCount}} 条评论</h3></div>
        <comment-item v-for="item in replys" :reply="item" :key="item.id"></comment-item>
    </div>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'

export default {
    data: function() {
        return {
            replys: [
                {
                    "id": 0,
                    "uid": 1,
                    "name": "hzz",
                    "content": "Microsoft YaHei Microsoft YaHei",
                    "time": "1970-01-01 00:00:00",
                    "agree": 0,
                    "oppose": 0,
                    "subs": [
                        {
                            id: 0,
                            uid: 2,
                            name: "hss",
                            content: "fjsdifjdsiafdas",
                            time: "1970-01-01 00:00:00",
                            toUid: 0,
                            toUser: ""
                        },
                        {
                            id: 0,
                            uid: 2,
                            name: "qee",
                            content: "我们拥有对父作用域属性的完全访问权限",
                            time: "1970-01-01 00:00:00",
                            toUid: 3,
                            toUser: "hehe"
                        }
                    ]
                }
            ]
        }
    },
    components: {
        CommentItem
    },
    computed: {
        replyCount: function() {
            return this.replys.length
        }
    },
    props: ["uri"]
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
