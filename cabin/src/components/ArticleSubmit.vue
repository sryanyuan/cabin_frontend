<template>
    <div id="editor-container">
        <div id="editor-header">
            <el-select v-model="ctvalue" placeholder="请选择分类">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <div id="editor-title">
                <el-input id="input-title" v-model="title" placeholder="请输入标题"></el-input>
            </div>
        </div>
        <mk-editor :ishowTitle="showTitle" @save="saveContent" ref="editor"></mk-editor>
    </div>
</template>

<script>
import MkEditor from '@/components/MkEditor.vue'
import api from "@/assets/js/api.js";
import eventbus from '@/assets/js/eventbus.js'

export default {
  data() {
    return {
      categoryId: 0,
      showTitle: true,
      title: "",
      mkcontent: "",
      options: [],
      ctvalue: ""
    };
  },
  created() {
        this.getCategories()
    },
  methods: {
      getCategories() {
        let self = this
            api.getCategoryList(function(response) {
                if (response.success) {
                    for (let ct of response.res) {
                        self.options.push({label: ct.name + "(" + ct.count + ")", value: ct.id})
                    }
                } else {
                    self.$message.warning(response.error)
                }
            })
      },
    saveContent(value, render) {
        if (value == "") {
            this.$message.warning("内容不能为空")
            return
        }
        if (this.showTitle && this.title == "") {
            this.$message.warning("标题不能为空")
            return
        }
        if (typeof(this.ctvalue) != "number") {
            this.$message.warning("清选择分类")
            return
        }
      let self = this;
      this.$confirm("是否确定发表？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.doSubmit(value);
        })
        .catch(() => {});
    },
    doSubmit(value) {
        let self = this
        api.postArticle(function(res) {
            if (!res.success) {
                self.$message.warning(res.error)
            } else {
                eventbus.bus.$emit(eventbus.eventUpdateCategories)
                self.$message.success("发表成功")
                console.log(res.res)
                self.$router.push({name: "blogArticle", params: {id: res.res.articleId}})
            }
        }, this.ctvalue, this.title, value)
    }
  },
  components: {
      MkEditor
  }
};
</script>

<style scoped>
.v-note-wrapper {
  z-index: 1;
  margin-top: 10px;
  height: 500px;
}

#editor-title {
  text-align: left;
  border-bottom: 1px solid rgba(160, 160, 160, 0.3);
  flex-grow: 1;
  margin-left: 20px;
}

h2 {
  margin-bottom: 2px;
  font-size: 14px;
}

#editor-buttons {
  margin-top: 20px;
}

#editor-buttons .button {
}

#editor-header {
    display: flex;
    flex-direction: row;
}
</style>
