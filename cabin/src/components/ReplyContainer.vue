<template>
    <div id="reply-container">
        <div id="reply-img-container">
            <a href="#">
                <img id="replier-image" src="static/image/my.png">
            </a>
        </div>
        <div id="reply-input">
            <el-input v-model="input" :placeholder="getPlaceholder"></el-input>
            <span class="reply-block-button" @click="commitReply">回复</span>
        </div>
        <div id="reply-captcha" v-show="showCaptcha">
            <div>
                <img id="captcha-img" @click="updateCaptcha" :src="getCaptchaImageURL" alt="验证码" title="看不清，点击" />
                <el-input id="catpcha-input" v-model="solution" placeholder="请输入验证码"></el-input>
                <el-button id="captcha-button" @click="doCommit" size="mini" plain>确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/assets/js/api.js'

export default {
    data: function() {
        return {
            input: "",
            placeholder: "请输入内容",
            tipShow: false,
            tipType: 0,
            showCaptcha: false,
            solution: "",
            captchaId: ""
        };
    },
    computed: {
        getPlaceholder() {
            if (null == this.toWho) {
                return "请输入内容";
            }
            return "回复 " + this.toWho.name + ":";
        },
        getCaptchaImageURL() {
            if ("" == this.captchaId) {
                return ""
            }
            return "/api/captcha/" + this.captchaId + ".png"
        }
    },
    methods: {
        commitReply() {
            let self = this
            if (null == this.toWho) {
                this.$message.warning("请选择回复人");
            }
            this.showCaptcha = true
            this.updateCaptcha()
        },
        doCommit() {
            let self = this
            this.showCaptcha = false
            api.postComment(function(res) {
                if (res.success) {
                    self.$emit("updateReply", self.subRefId)
                    self.input = ""
                    self.$message.success("您的回复已提交，请等待审核")
                } else {
                    self.$message.warning(res.error)
                }
            }, this.uri, this.input, this.subRefId, this.toWho.uid, this.captchaId, this.solution)
            this.solution = ""
        },
        updateCaptcha() {
            let self = this
            let res = api.getLoginCaptcha(function(res) {
                if (!res.success) {
                    this.$message.warning(res.error)
                } else {
                    self.captchaId = res.res.captcha
                }
            })
        }
    },
    props: ["toWho", "subRefId", "uri"]
};
</script>

<style scoped>
.reply-block-button {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 80px;
    margin-right: 16px;
    padding: 0 12px;
    border: 1px solid #d9dde1;
    border-radius: 2px;
    color: #93999f;
    box-sizing: border-box;
    cursor: pointer;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    margin-left: 24px;
    text-align: center;
}

.reply-block-button:hover {
    transition: all 0.5s;
    color: black;
    border: 1px solid black;
}

.reply-block-button {
    font-weight: 400px;
    font-style: normal;
    font-size: 12px;
    vertical-align: middle;
}

#reply-container {
    margin-top: 2px;
    margin-bottom: 2px;
    height: 90px;
    background-color: #f8fafc;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 24px 25px;
    position: relative;
}

#reply-input {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    padding-left: 24px;
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

#reply-captcha {
    width: 200px;
    height: 150px;
    background-color: white;
    box-shadow: 0 8px 16px 0 rgba(7, 17, 27, .2);
    border-radius: 8px;
    position: absolute;
    top: 80px;
    right: 0px;
    padding: 20px 20px;
}

#captcha-img {

}

#captcha-input {
    margin-top: 10px;
}

#captcha-button {
    margin-top: 10px;
}
</style>
