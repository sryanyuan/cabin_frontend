<template>
    <div class="sub-reply">
        <div id="reply-main">
            <div id="reply-img-container">
                <a href="#">
                    <img id="replier-image" src="static/image/my.png">
                </a>
            </div>
            <div id="reply-content-container">
                <div id="name-floor">
                    <a href="#">{{reply.name}}</a>
                    <template v-if="showReplyTo">
                        <span id="reply-text">回复</span>
                        <a href="#">{{reply.toUser}}</a>
                    </template>
                    <span id="floor-num">#{{floorNum}}</span>
                </div>
                <div>
                    <p>{{reply.content}}</p>
                </div>
            </div>
        </div>
        <div id="reply-actions">
            <span class="sub-to-reply" @click="doReply">回复</span>
            <span class="reply-time">{{reply.time}}</span>
        </div>
    </div>
</template>

<script>
import api from '@/assets/js/api.js'
import store from '@/assets/js/store.js'
import privilege from '@/assets/js/privilege.js'

export default {
    data: function() {
        return {

        }
    },
    computed: {
        floorNum: function () {
            return this.floorIndex + 1
        },
        showReplyTo: function() {
            if (null == this.reply.toUid) {
                return false
            }
            if (this.reply.uid == this.reply.toUid) {
                return false
            }
            return this.reply.toUid != 0
        }
    },
    methods: {
        doReply: function() {
            this.$emit('replyTo', this.reply.uid, this.reply.name)
        },
        isAdmin() {
            if (store.state.userInfo.role >= privilege.superAdmin) {
                return true;
            }
            return false;
        }
    },
    props: ["reply", "floorIndex"]
}
</script>

<style scoped>
#reply-text {
    margin-left: 4px;
    margin-right: 4px;
    font-size: 14px;
}

#name-floor>a {
    text-decoration: none;
    color: #93999f;
    font-size: 14px;
    line-height: 24px;
}

#name-floor {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

#floor-num {
    flex-grow: 1;
    text-align: right;
    font-size: 12px;
    color: #b7bbbf;
    line-height: 24px;
}

.reply-time {
    flex-grow: 1;
    font-size: 12px;
    color: #93999f;
    line-height: 32px;
    text-align: right;
}

#reply-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 78px;
    padding-top: 12px;
}

.sub-to-reply {
    margin-left: 8px;
    margin-right: 24px;
    font-size: 12px;
    color: #93999f;
    line-height: 32px;
    cursor: pointer;
}

.sub-reply {
    margin-left: 78px;
    background-color: #f8fafc;
    border-radius: 4px;
    margin-bottom: 2px;
    padding: 24px 24px 24px 24px;
    margin-top: 2px;
}

#reply-main {
    display: flex;
    flex-direction: row;
    justify-content: start;
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
    flex-grow: 1;
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
