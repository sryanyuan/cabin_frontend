<template>
    <div id="reply-container">
        <div id="reply-img-container">
            <a href="#">
                <img id="replier-image" src="static/image/my.png">
            </a>
        </div>
        <div id="reply-input">
            <el-input v-model="input" :placeholder="getPlaceholder"></el-input>
            <span class="reply-block-button">回复</span>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            input: "",
            placeholder: "请输入内容"
        }
    },
    computed: {
        getPlaceholder() {
            if (null == this.toWho) {
                return "请输入内容"
            }
            return "回复 " + this.toWho.name + ":"
        }
    },
    methods: {
        
    },
    props: ['toWho']
}
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-left: 24px;
    text-align: center;
}

.reply-block-button:hover {
    transition: all .5s;
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
</style>
