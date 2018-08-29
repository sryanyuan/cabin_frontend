<template>
    <div id="register-container">
        <el-form id="register-form" :model="registerData" :rules="rules" ref="registerForm">
            <h3 id="register-title">账户注册</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="registerData.username" auto-complete="off" placeholder="账户"></el-input>
            </el-form-item>
            <el-form-item prop="mail">
                <el-input type="text" v-model="registerData.mail" auto-complete="off" placeholder="电邮"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="registerData.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
                <el-input type="password" v-model="registerData.password2" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-row type="flex" class="row-bg">
                    <el-col :span="10">
                        <el-form-item prop="solution">
                            <el-input type="text" v-model="registerData.solution" auto-complete="off" placeholder="验证码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <img id="captcha-img" @click="updateCaptcha" :src="getCaptchaImageURL" alt="验证码" title="看不清，点击" />
                    </el-col>
                    <el-col :span="6"></el-col>
                    <el-col :span="6">
                        <el-button type="plain" @click="doregister">注册</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <div id="login-container">
                <router-link :to="{name: 'login'}">已有账号?登录</router-link>
            </div>
        </el-form>
    </div>
</template>

<script>
import api from '@/assets/js/api.js'

export default {
    data: function() {
        var validatePass2 = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("请确认密码"))
            } else if (value != this.registerData.password) {
                callback(new Error("密码不一致"))
            } else {
                callback()
            }
        };
        return {
            registerData: {
                username: "",
                password: "",
                password2: "",
                mail: "",
                captchaId: "",
                solution: ""
            },
            rules: {
                username: [
                    {required: true, message: "请输入账户", trigger: 'blur'},
                    {min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: 'blur'}
                ],
                mail: [
                    {type: "email", required: true, message: "请输入合法的电邮", trigger: 'blur'},
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: 'blur'},
                    {min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: 'blur'}
                ],
                password2: [
                    {validator: validatePass2, trigger: 'blur'}
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
            if ("" == this.registerData.captchaId) {
                return ""
            }
            return "/api/captcha/" + this.registerData.captchaId + ".png"
        }
    },
    methods: {
        updateCaptcha() {
            let self = this
            let res = api.getLoginCaptcha(function(res) {
                if (!res.success) {
                    this.$message.warning(res.error)
                } else {
                    self.registerData.captchaId = res.res.captcha
                }
            })
        },
        doregister() {
            let registerForm = this.$refs["registerForm"]
            let self = this
            registerForm.validate((valid) => {
                if (valid && self.registerData.solution.length == 4) {
                    api.postRegister(function(res) {
                        if (!res.success) {
                            self.$message.warning(res.error)
                            self.updateCaptcha()
                        } else {
                            self.$router.push({name: "login"})
                            self.$message.success("注册成功，请登录")
                        }
                    }, this.registerData)
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
#register-form {
    border-radius: 5px;
    border: 1px solid #eaeaea;
    background-color: white;
    box-shadow: 0 0 25px #cac6c6;
    padding: 35px 35px 15px 35px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
}

#login-container {
    text-align: left;
}

#login-container>a {
    text-decoration: none;
    color: #3c3b3b;
    transition: color .2s ease, border-bottom-color .2s ease;
    font-family: Releway, Helvetica, sans-serif;
    font-size: 12px;
}
</style>