<template>
    <div id="login-container">
        <el-form id="login-form" :model="loginData" :rules="rules" ref="loginForm">
            <h3 id="login-title">登入系统</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginData.username" auto-complete="off" placeholder="账户"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginData.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10">
                        <el-form-item prop="solution">
                            <el-input type="text" v-model="loginData.solution" auto-complete="off" placeholder="验证码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <img id="captcha-img" @click="updateCaptcha" :src="getCaptchaImageURL" alt="验证码" title="看不清，点击" />
                    </el-col>
                    <el-col :span="6"></el-col>
                    <el-col :span="6">
                        <el-button type="plain" @click="doLogin">登入</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <div id="register-container">
                <router-link :to="{name: 'register'}">没有账号?注册</router-link>
            </div>
        </el-form>
    </div>
</template>

<script>
import api from '@/assets/js/api.js'

export default {
    data: function() {
        return {
            loginData: {
                username: "",
                password: "",
                captchaId: "",
                solution: ""
            },
            rules: {
                username: [
                    {required: true, message: "请输入账户", trigger: 'blur'},
                    {min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: 'blur'}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: 'blur'},
                    {min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: 'blur'}
                ],
                solution: [
                    {required: true, message: "请输入验证码", trigger: 'blur'},
                    {min: 4, max: 4, message: "长度不符", trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        getCaptchaImageURL() {
            if ("" == this.loginData.captchaId) {
                return ""
            }
            return "/api/captcha/" + this.loginData.captchaId + ".png"
        }
    },
    methods: {
        updateCaptcha() {
            let self = this
            let res = api.getLoginCaptcha(function(res) {
                if (!res.success) {
                    this.$message.warning(res.error)
                } else {
                    self.loginData.captchaId = res.res.captcha
                }
            })
        },
        doLogin() {
            let loginForm = this.$refs["loginForm"]
            let self = this
            loginForm.validate((valid) => {
                if (valid && self.loginData.solution.length == 4) {
                    api.postLogin(function(res) {
                        if (!res.success) {
                            self.$message.warning(res.error)
                            self.updateCaptcha()
                        } else {
                            self.$router.push({name: "blogIndex"})
                        }
                    }, this.loginData)
                } else {
                    self.$message.warning("invalid input")
                }
            })
        }
    },
    created() {
        this.updateCaptcha()
    }
}
</script>

<style scoped>
#login-form {
    border-radius: 5px;
    border: 1px solid #eaeaea;
    background-color: white;
    box-shadow: 0 0 25px #cac6c6;
    padding: 35px 35px 15px 35px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
}

#register-container {
    text-align: left;
}

#register-container>a {
    text-decoration: none;
    color: #3c3b3b;
    transition: color .2s ease, border-bottom-color .2s ease;
    font-family: Releway, Helvetica, sans-serif;
    font-size: 12px;
}
</style>