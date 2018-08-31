<template>
    <li>
        <article>
            <header @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
                <router-link :to="{name: 'blogCategory', params: {id: categoryId}, query: {page: 0}}">{{name}}</router-link>
                <span v-show="showButtons" class="sub-expand" @click="editCategory">编辑</span>
                <span style="float:right;">{{count}}</span>
                <div id="cate-editor" v-show="showEditor" v-loading="editorLoading">
                    <el-input id="input-name" v-model="editCateName" placeholder="请输入目录名"></el-input>
                    <el-input id="input-desc" v-model="editCateDesc" placeholder="请输入目录描述"></el-input>
                    <div id="edit-buttons">
                        <el-button id="cancel-button" @click="doCancel" size="mini" plain>取消</el-button>
                        <el-button id="commit-button" @click="doEdit" size="mini" type="primary">确定</el-button>
                    </div>
                </div>
            </header>
        </article>
    </li>
</template>

<script>
import privcheck from '@/assets/js/privcheck.js'
import eventbus from '@/assets/js/eventbus.js'
import api from '@/assets/js/api.js'

export default {
    data: function() {
        return {
            editCateName: "",
            editCateDesc: "",
            showEditor: false,
            editorLoading: true,
            mouseIn: false
        }
    },
    computed: {
        showButtons() {
            return privcheck.isSuperAdmin() && this.mouseIn
        }
    },
    methods: {
        onMouseEnter() {
            this.mouseIn = true
        },
        onMouseLeave() {
            this.mouseIn = false
        },
        editReset() {
            this.editCateDesc = ""
            this.editCateName = ""
        },
        editCategory() {
            let self = this
            this.showEditor = true
            this.editorLoading = true
            api.getCategory(function(res) {
                self.editorLoading = false
                if (res.success) {
                    self.editCateName = res.res.name
                    self.editCateDesc = res.res.desc
                    console.log(self.editCateName, self.editCateDesc)
                } else {
                    self.$message.warning(res.error)
                }
            }, this.categoryId)
        },
        doEdit() {
            let self = this
            this.showEditor = false
            api.putCategory(function(res) {
                self.editorLoading = false
                if (res.success) {
                    self.$emit("categoryNameChanged", self.categoryId, self.editCateName)
                    self.$message.success("修改成功")
                } else {
                    self.$message.warning(res.error)
                }
                self.editReset()
            }, this.categoryId, this.editCateName, this.editCateDesc)
        },
        doCancel() {
            this.editReset()
            this.showEditor = false
        },
    },
    props: ["name", "count", "categoryId"]
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #3c3b3b;
    font-family: Releway, Helvetica, sans-serif;
    font-size: 16px;
}

header>:last-child {
    margin-bottom: 0;
}

header {
    opacity: .65;
    position: relative;
}

.sub-expand {
  margin-left: 8px;
  margin-right: 24px;
  font-size: 12px;
  color: #93999f;
  line-height: 16px;
  cursor: pointer;
}

.sub-expand:hover {
  color: black;
  transition: all 0.5s;
}

#cate-editor {
  width: 300px;
  height: auto;
  background: white;
  position: absolute;
  padding: 10px;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, .2);
  border-radius: 8px;
}

#cate-editor>.el-input:first-child {
    margin-bottom: 10px;
}

#edit-buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>
